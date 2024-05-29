import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './Shipping.css';

const Shipping = () => {
    const [formData, setFormData] = useState({
        recipientName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phoneNumber: '',
    });

    const navigate = useNavigate();

    const [price, setPrice] = useState(0);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
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
                }
            } catch (error) {
                console.error("Error fetching cart count:", error);
            }
        };

        fetchCartData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        localStorage.setItem("shipping", JSON.stringify(formData));
        navigate('/checkout');
    };


    return (
        <div className="form-container">
            <form className="address-form">
                <div className="form-row">
                    <label>Recipient Name:</label>
                    <input
                        type="text"
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>State:</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Zip Code:</label>
                        <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Country:</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Proceed to Checkout</button>
            </form>
            <div className="summary-details">
                <div className="subtotal">
                    <span className="subtotal-label">Subtotal: </span>
                    <span className="subtotal-amount">${price}</span>
                </div>
                <div className="shipping">
                    <span className="shipping-label">Shipping: </span>
                    <span className="shipping-amount">$5.00</span>
                </div>
                <div className="tax">
                    <span className="tax-label">Tax: </span>
                    <span className="tax-amount">$2.00</span>
                </div>
                <div className="total">
                    <span className="total-label">Total: </span>
                    <span className="total-amount">
                        ${(parseFloat(price) + 5.00 + 2.00).toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
