// Footer.js
import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>Email: example@example.com</p>
          <p>Phone: +123456789</p>
          <p>Address: 123, Street Name, City, Country</p>
        </div>
        <div className="copyright">
        <p>&copy; 2024 FindAll. All rights reserved.</p>
      </div>
      </div>
    
    </footer>
  );
}

export default Footer;
