import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();
    useEffect(() => {
        // Function to fetch user data from the backend
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                // if (!token) {
                //     alert("You need to login to access this page!")
                //     navigate('/login');
                //     return;
                // }

                const decoded = jwtDecode(token);
                const username = decoded.sub;
        
            console.log(username);

            

                const response = await fetch(`http://localhost:8080/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
                if (response.ok) {
                    const userData = await response.json();
                    // setFormData(userData); 
                    const updatedData = {
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        username: userData.username,
                        email: userData.email,
                        phoneNumber: userData.phoneNumber,
                        state: userData.state,
                        zipCode: userData.zipCode
                    };
                    setFormData(updatedData);
                    

                    // console.log(formData)
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []); 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const handleSave = async (e) => {

        e.preventDefault();
        console.log(formData);
        
        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);


                const username1 = decoded.sub;
                
            const response = await fetch(`http://localhost:8080/update/${username1}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('User data updated successfully');
                alert("You update succesfully your Data")
                window.location.reload();

            } else {
                console.error('Failed to update user data:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div className="account-container">
            <div className="sidebar">
                <h2>Account Menu</h2>
                <ul>
                    <li><Link to="/account/password">Change password</Link></li>
                    <li><Link to="/account/orders">Orders</Link></li>
                    <li><Link to="/account/delete">Account Settings</Link></li>
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
                <button className='savebutton' onClick={handleSave} >Save Changes</button>
            </form>
            </div>
        </div>
    );
}

export default AccountDetails;
