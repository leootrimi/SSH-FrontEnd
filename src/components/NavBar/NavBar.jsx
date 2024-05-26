import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import logo from "../../assets/images/logoF.avif";
import cart_icon from "../../assets/images/download2.png";
import user_icon from "../../assets/images/user.png"
import logout from "../../assets/images/sign-out-alt.png"
import orders from "../../assets/images/money-check-edit.png"
import account from "../../assets/images/portrait.png"
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import "./navbar.scss";

const NavBar = () => {
    const token = localStorage.getItem('token');
    
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const cartClikc = () => {
        navigate('/cartt');
    }

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const token = localStorage.getItem('token');
                const decoded = jwtDecode(token);
                const username = decoded.sub;
                const response = await fetch(`http://localhost:8080/carts/user/${username}/count`, {
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
                setCartCount(data);
            } catch (error) {
                console.error("Error fetching cart count:", error);
            }
        };
    
        fetchCartCount();
    }, [token]);

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>FindAll</p>
            </div>
            <ul className="nav-menu">
                <li><Link to="/">Shop</Link></li>
                <li><Link to="/women">Women</Link></li>
                <li><Link to="/men">Men</Link></li>
                <li><Link to="/kids">Kids</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <div className="nav-login-cart">
                {token ? (
                    <>
                    <Link to="/cart"><img className="cart-icon" src={cart_icon} onClick={cartClikc} alt="Cart" /></Link>
                        <div className="cart-count">{cartCount}</div>
                        <div className="profile-image" onClick={toggleDropdown}>
                            <img src={user_icon} alt="Profile" /> 
                        </div>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li><img src={account} /><Link to="/account">Account</Link></li>
                                    <li><img src={orders} /><Link to="/orders">Orders</Link></li>
                                    <li><img src={logout} /><Link onClick={handleLogout}>Logout</Link></li>
                                </ul>
                            </div>
                        )}
                        
                    </>
                ) : (
                    <>
                        <Link to="/login"><button>Login</button></Link> {/* Render Login button */}
                        {/* <Link to="/cart"><img className="cart-icon" src={cart_icon} alt="" /></Link>
                        <div className="cart-count">0</div> */}
                    </>
                )}
            </div>
        </div>
    );
}

export default NavBar;
