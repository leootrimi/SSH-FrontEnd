import React, { useEffect, useState } from "react";
import './OrdersPage.scss'; // Import CSS file for styling
import { jwtDecode } from "jwt-decode";

function OrdersPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const username = decoded.sub;

        const response = await fetch(`http://localhost:8080/carts/findByUsername/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="order-box">
          <h2>Total Spent</h2>
          <p>$500</p>
        </div>
        <div className="order-box">
          <h2>Product Bought</h2>
          <p>5</p>
        </div>
        <div className="order-box">
          <h2>Last Order</h2>
          <p>May 25, 2024</p>
        </div>
      </div>
      <div className="Products">
      <div className="product-list-container">
        <h2 className="products-list-title">Products</h2>
        <ul className="product-items">
          {data && data.map((product, index) => (
            <li key={index} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <span className="product-name">{product.title}</span>
                <span className="product-price">${product.price}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="order-box1">
          <h2>Product Bought</h2>
          <p>5</p>
        </div>
        </div>

        </div>
        
   
  );
}

export default OrdersPage;
