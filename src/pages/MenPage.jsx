// CartPage.js
import React from 'react';
import './MenPage.scss';

const MenPage = () => {
  return (
    <div className="cart-page">
      <div className="sidebar">
        <h2>Categories</h2>
        <ul>
          <li>T-Shirts</li>
          <li>Shoes</li>
          <li>Pants</li>
          {/* Add more categories as needed */}
        </ul>
      </div>
      <div className="product-list">
        <h2>Products</h2>
        {/* Products will be displayed here */}
      </div>
    </div>
  );
}

export default MenPage;
