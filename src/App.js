import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import AccountDetails from './components/Account/AccountDetails.jsx';
import ContactForm from './components/Contact/ContactForm.jsx';
import Footer from "./components/Footer/Footer.jsx";
import Login from './components/LoginForm/Login.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import { default as Product, default as ProductDetail } from "./components/Product/ProductDetail.jsx";
import ProductListing from "./components/Product/ProductListing.jsx";
import ShopCategory from './components/Shop/ShopCategory.jsx';
import SignupForm from './components/SignupForm/SignupForm.jsx';
import ChangePass from './components/Account/ChangePass.jsx';
import checkAuth from './middleware/checkAuth';

const AppRoutes = () => {
  const location = useLocation();
  const authMiddleware = checkAuth();
  authMiddleware(location);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/women" element={<WomenPage />} />
      <Route path="/men" element={<MenPage />} />
      <Route path="/productL" exact element={<ProductListing />} />
      <Route path="/productL/:productId" exact element={<ProductDetail />} />
      <Route path="/kids" element={<ShopCategory category="kids" />} />
      <Route path="/contact" element={<ContactForm />} />
      <Route path='/Checkout' element={<Payment />} />
      <Route path="/product" element={<Product />}>
        <Route path=":productId" element={<Product />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignupForm />} />
      <Route path="/account" element={<AccountDetails />} />
      <Route path="/account/password" element={<ChangePass />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <AppRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
