import React, { useEffect, useState } from "react";
import './OrdersPage.scss'; // Import CSS file for styling
import { jwtDecode } from "jwt-decode";

function OrdersPage() {
  const [data, setData] = useState(null);
  const [price, setPrice] = useState(null);
  const [count, setCount] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const username = decoded.sub;

        const response = await fetch(`http://localhost:8080/sold/product/${username}`, {
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

      try{
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const username = decoded.sub;
      const total = await fetch(`http://localhost:8080/sold/price/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      
      });
      const data1 = await total.json();
        setPrice(data1);
        console.log(data1);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }

    try{
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const username = decoded.sub;
    const count = await fetch(`http://localhost:8080/sold/count/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    
    });
    const data1 = await count.json();
      setCount(data1);
      console.log(data1);
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
  try {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found in localStorage');
    }

    const decoded = jwtDecode(token);
    const username = decoded.sub;

    const response = await fetch(`http://localhost:8080/sold/date/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const text = await response.text();
    setDate(text);
    console.log('Raw Response Text:', text);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = JSON.parse(text);
    console.log('Parsed JSON Data:', data);
    setCount(data);
} catch (error) {
    
}

    };

    fetchCartData();
  }, []);

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="order-box">
          <h2>Total Spent</h2>
          <p>{price} $</p>
        </div>
        <div className="order-box">
          <h2>Product Bought</h2>
          <p>{count}</p>
        </div>
        <div className="order-box">
          <h2>Last Order</h2>
          <p>{date}</p>
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
          <h2>You made the best choice</h2>
          <p>Thank you,Find All</p>
        </div>
        </div>

        </div>
        
   
  );
}

export default OrdersPage;
