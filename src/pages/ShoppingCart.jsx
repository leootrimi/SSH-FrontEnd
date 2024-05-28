import React, { useEffect, useState } from "react";
import './ShoppingCart.css'; // Import CSS file for styling
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();


  const addToCart = (product) => {
    setCart([...cart, product]);
  };



  const removeFromCart = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const username = decoded.sub;

      const response = await fetch(`http://localhost:8080/carts/removeCart/${id}/${username}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        window.location.reload();
      }

    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };



  useEffect(() => {
    const fetchCartData = async () => {

        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const username = decoded.sub;
            const response = await fetch(`http://localhost:8080/carts/totalPrice/${username}`, {
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
            console.log(data);
            setPrice(data);
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }


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
        const key = "products";
        const existingData = localStorage.getItem(key);

          // Check if the existing data is different from the new data
          if (existingData) {
              const parsedExistingData = JSON.parse(existingData);
              const isDifferent = JSON.stringify(parsedExistingData) !== JSON.stringify(data);

              if (isDifferent) {
                  // The data is different, update localStorage with the new data
                  localStorage.setItem(key, JSON.stringify(data));
                  console.log('Data updated in localStorage:', data);
              } else {
                  console.log('Data in localStorage is already up to date:', parsedExistingData);
              }
          } else {
              // No existing data, set the new data in localStorage
              localStorage.setItem(key, JSON.stringify(data));
              console.log('Data set in localStorage:', data);
          }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);



  return (
    <div className="shopping-cart">
      <div className="product-list-container">
        <h2 className="products-list-title">Products</h2>
        <ul className="product-items">
          {data && data.map((product, index) => ( 
            <li key={index} className="product-item">
          <button className="remove-from-cart-button" onClick={() => removeFromCart(product.id)}>x</button>

              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <span className="product-name">{product.title}</span>
                <span className="product-price">${product.price}</span>
              </div>

            </li>
          ))}
        </ul>
      </div>
      <div className="cart-summary-container">
  <div className="cart-summary">
    <h2 className="cart-summary-title">Cart</h2>
    <ul className="cart-items">
      {cart.map((product, index) => (
        <li key={index} className="cart-item">
          <div className="cart-item-details">
            <span className="cart-item-name">{product.name}</span>
            <span className="cart-item-price">${product.price}</span>
          </div>
        </li>
      ))}
    </ul>
    <div className="summary-details">
      <div className="subtotal">
        <span className="subtotal-label">Subtotal: </span>
        <span className="subtotal-amount">${price}</span>
      </div>
      <div className="shipping">
        <span className="shipping-label">Shipping: </span>
        <span className="shipping-amount">$5.00</span> {/* Example shipping cost */}
      </div>
      <div className="tax">
        <span className="tax-label">Tax: </span>
        <span className="tax-amount">$2.00</span> {/* Example tax amount */}
      </div>
      <div className="total">
        <span className="total-label">Total:</span>
        <span className="total-amount">
          ${parseFloat(price) + 5.00 + 2.00} {/* Total calculation including shipping and tax */}
        </span>
      </div>
    </div>
    <button className="checkout-button"  onClick={() => {
          navigate('/checkout');
        }}>Checkout</button>
  </div>
</div>

    </div>
  );
}

export default ShoppingCart;
