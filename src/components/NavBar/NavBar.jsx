import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from "../../assets/images/logoF.avif";
import cart_icon from "../../assets/images/download2.png";
import { useNavigate } from 'react-router-dom';
import "./navbar.scss";

const NavBar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/');
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
                        <button onClick={handleLogout}>Logout</button> {/* Render Logout button */}
                        <Link to="/cart"><img className="cart-icon" src={cart_icon} alt="" /></Link>
                        <div className="cart-count">0</div>
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
