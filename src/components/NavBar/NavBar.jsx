import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import logo from "../../assets/images/logoF.avif";
import cart_icon from "../../assets/images/download2.png";
import user_icon from "../../assets/images/user.png"
import logout from "../../assets/images/sign-out-alt.png"
import orders from "../../assets/images/money-check-edit.png"
import account from "../../assets/images/portrait.png"
import { useNavigate } from 'react-router-dom';
import "./navbar.scss";

const NavBar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

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
            </ul>
            <div className="nav-login-cart">
                {token ? (
                    <>
                    <Link to="/cart"><img className="cart-icon" src={cart_icon} alt="Cart" /></Link>
                        <div className="cart-count">0</div>
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
