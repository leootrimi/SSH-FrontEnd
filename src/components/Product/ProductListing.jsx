import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import ProductComponent from './ProductComponent';
import { setProducts } from '../../redux/actions/productActions';
import {jwtDecode} from 'jwt-decode';

const ProductListing = ({ categoryID }) => {
    const products = useSelector((state) => state.products); // Adjust according to your state shape
    const dispatch = useDispatch();

    console.log('Category ID:', categoryID);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const decoded = jwtDecode(token);
            const username = decoded.sub;
            
            const response = await axios.get(`http://localhost:8080/api/getproductsCategory/${categoryID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                dispatch(setProducts(response.data));
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [categoryID]);  // Add categoryID as a dependency

    console.log('Products: ', products);
    return (
        <div className='ui grid container'>
            <ProductComponent products={products} />
        </div>
    );
};

export default ProductListing;
