import React, {useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectedProduct} from '../../redux/actions/productActions'
import 'semantic-ui-css/semantic.min.css';
import { jwtDecode } from "jwt-decode";
import "./PC.scss"

const ProductDetail = () => {
  const {productId} = useParams();
  const product = useSelector((state) => state.product)
  const {image, title, price, category, description} = product;
  const categoryName = category?.name;
  const dispatch = useDispatch();
  console.log(productId)

  const fetchProductDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
      console.log("Response:", response);

      if (response.data) {
          console.log("Data:", response.data);
          dispatch(selectedProduct(response.data));
      } else {
          console.log("Empty response or missing data property");
 
      }
  } catch (error) {
      console.log("Error:", error);
      
  }
  };


  const addToCart = async () => {


    try {

      const token = localStorage.getItem('token');

    

      if (!token) {
          alert("You need to login to access this page!")
          // navigate('/login');
          return;
      }
      const decoded = jwtDecode(token);
      const username = decoded.sub;

  console.log(username);

  const requestData = {
    username: username,
    productId: productId 
  };
  console.log(requestData);

        const response = await axios.post("http://localhost:8080/api/products/add", requestData);
        console.log("Response:", response.data);
        
    } catch (error) {
        console.error("Error:", error);
        
    }
};



  useEffect(() => {
    if(productId && productId !== "") fetchProductDetail();

  }, [productId])
  return (
    
    <div className="ui grid container product-detail-container">
     
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image custom-image" src={image} />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <a className="ui teal tag label">${price}</a>
                </h2>
                <h3 className="ui brown block header">{categoryName}</h3>
                <p>{description}</p>
                <div className="ui vertical animated button" tabIndex="0" onClick={addToCart}>
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail;
