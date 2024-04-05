import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

import "./account.scss";

const AccountDetails = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        state: '',
        zipCode: ''
    });

    useEffect(() => {
        // Function to fetch user data from the backend
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                const decoded = jwtDecode(token);
                const username = decoded.sub;
        
            console.log(username);

            console.log(formData)

                const response = await fetch(`http://localhost:8080/users/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
                if (response.ok) {
                    const userData = await response.json();
                    setFormData(userData); 
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []); // Empty dependency array ensures the effect runs only once after the initial render

    // Function to handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="account-container">
            {/* Left Sidebar */}
            <div className="sidebar">
                <h2>Account Menu</h2>
                <ul>
                    <li><Link to="/account/profile">Edit Profile</Link></li>
                    <li><Link to="/account/orders">Orders</Link></li>
                    <li><Link to="/account/settings">Account Settings</Link></li>
                </ul>
            </div>
            
            {/* Right Section */}
            <div className="account-info">
            <form>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                {/* Repeat the above pattern for other input fields */}
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="zipCode">Zip Code:</label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                    />
                </div>
            </form>
            </div>
        </div>
    );
}

export default AccountDetails;
