import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ChangePass = () => {
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(passwords);
    
        if (passwords.newPassword !== passwords.confirmNewPassword) {
            console.log("Passwords do not match");
            return;
        }
    
        try {

            const token = localStorage.getItem('token');
                const decoded = jwtDecode(token);
                const username = decoded.sub;

                console.log(username);
            const response = await fetch(`http://localhost:8080/update/password/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    oldPassword: passwords.oldPassword,
                    newPassword: passwords.newPassword
                })
            });
    
            if (response.ok) {
                console.log('Password updated successfully');
            } else {
                console.error('Failed to update password:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    return (
        <div className="account-container">

            <div className="sidebar">
                <h2>Account Menu</h2>
                <ul>
                    <li><Link to="/account/password">Change password</Link></li>
                    <li><Link to="/account/orders">Orders</Link></li>
                    <li><Link to="/account/settings">Account Settings</Link></li>
                </ul>
            </div>  
            {/* Right Section */}
            <div className="account-info">
                <form>
                    <div>
                        <label htmlFor="oldPassword">Old Password:</label>
                        <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            value={passwords.oldPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={passwords.confirmNewPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button className='savebutton' onClick={handleSave}>Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePass;
