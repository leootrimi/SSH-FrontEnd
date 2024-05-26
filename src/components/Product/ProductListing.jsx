import React, {useEffect} from 'react'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import ProductComponent from "./ProductComponent"
import {setProducts} from "../../redux/actions/productActions"


const ProductListing = () => {
    const products = useSelector((state) => state);
    const dispatch = useDispatch();



const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/getproducts');
        dispatch(setProducts(response.data));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

useEffect(() =>{
    fetchProducts();
}, []);

    console.log("Products : ", products);
  return ( 
    <div className='ui grid container'>
        <ProductComponent />
    </div>
  );
};

export default ProductListing;
