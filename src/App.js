import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AccountDetails from './components/Account/AccountDetails.jsx';
import Footer from "./components/Footer/Footer.jsx";
import Login from './components/LoginForm/Login.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Product from "./components/Product/Product.jsx";
import ShopCategory from './components/Shop/ShopCategory.jsx';
import SignupForm from './components/SignupForm/SignupForm.jsx';
import Cart from "./pages/Cart.jsx";
import HomePage from "./pages/Home";
import MenPage from "./pages/MenPage.jsx";
import WomenPage from "./pages/WomenPage.jsx";

import ChangePass from './components/Account/ChangePass.jsx';
function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />   
          <Route path="/women" element={<WomenPage/> }/> 
          <Route path="/men" element={<MenPage />} />

          <Route path="/kids" element={<ShopCategory category="kids" />} />   

          <Route path="/product" element={<Product/>}>   
            <Route path=":productId" element={<Product/>} /> 
          </Route>  

          <Route path="/cart" element={<Cart/>} />   
          <Route path="/login" element={<Login />} />   
          <Route path="/register" element={<SignupForm />} />   
          <Route path="/account" element={<AccountDetails />} />   
          <Route path="/account/password" element={<ChangePass />} />   
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
