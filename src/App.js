import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/Home"
import NavBar from './components/NavBar/NavBar.jsx';
import Login from './components/LoginForm/Login.jsx';
import './App.css';
import ShopCategory from './components/Shop/ShopCategory.jsx';
import Product from "./components/Product/Product.jsx"
import Cart from "./pages/Cart.jsx"
import SignupForm from './components/SignupForm/SignupForm.jsx';
function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />   
          <Route path="/women" element={<ShopCategory category="women" />} />   
          <Route path="/men" element={<ShopCategory category="men" />} />   
          <Route path="/kids" element={<ShopCategory category="kids" />} />   

          <Route path="/product" element={<Product/>}>   
            <Route path=":productId" element={<Product/>} /> 
          </Route>  

          <Route path="/cart" element={<Cart/>} />   
          <Route path="/login" element={<Login />} />   
          <Route path="/register" element={<SignupForm />} />   
        </Routes>
      </div>
    </Router>
  );
}

export default App;
