import React, { useEffect, useState } from "react";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { GrSecure } from "react-icons/gr";
import { jwtDecode } from "jwt-decode";
import { usePaymentInputs } from "react-payment-inputs";
import axios from 'axios';


export default function Form() {
  const form = useRef();
  const navigate = useNavigate();
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();

  const [checked, setChecked] = React.useState(true);
  const [cardNumber, setCardNumber] = React.useState("");
  const [details, setDetails] = React.useState({
    expiryDate: "",
    cvc: "",
    NomDuClient: ""
  });
  const [price, setPrice] = useState(null);
  
  useEffect(() => {
    const fetchCartCount = async () => {
        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const username = decoded.sub;
            const response = await fetch(`http://localhost:8080/carts/totalPrice/${username}`, {
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
            setPrice(data);
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };

    fetchCartCount();
}, []);

  const handleChange = (e) => {
    setDetails((prevFormDetails) => {
      return {
        ...prevFormDetails,
        [e.target.name]: e.target.value
      };
    });

    console.log(details);
  };

  const handleChangeCardNumber = (e) => {
    setCardNumber(
      e.target.value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
    );
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
          throw new Error('No token found');
      }
      const decoded = jwtDecode(token);
      const username = decoded.sub;
      
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10); // Format: YYYY-MM-DD
      
      const formData = {
          paymentMethod: "Credit Card",
          paymentDate: formattedDate,
          amount: parseFloat(price) + 5.00 + 2.00, 
          fullName: details.NomDuClient,
          username: username
      };

      console.log(JSON.stringify(formData));
      const response = await fetch(`http://localhost:8080/payments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(formData)


});

    const product = localStorage.getItem("products", )
    const size = JSON.parse(product)
    console.log(size);

    const orderData = {
      date: formattedDate,
      price: price + 7,
      numberOfProducts: size.length,
      fullName: username,
      username: username
    }

    const response1 = await fetch(`http://localhost:8080/orders`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(orderData)
});


    } catch (error) {
        console.error('Error saving payment data:', error);
    }



    const product = localStorage.getItem("products", )
    const size = JSON.parse(product)
    size.forEach(async size => {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const username = decoded.sub;
          const ordersData = {
            id: size.id,
            title: size.title,
            price: size.price,
            description: size.description,
            image: size.image,
            category: size.category.id
          }

          console.log(ordersData);
          const response = await fetch('http://localhost:8080/sold', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(ordersData)
          });
  
          if (response.ok) {
              console.log('Product sent successfully:', product);
          } else {
              console.error('Failed to send product:', product);
          }
      } catch (error) {
          console.error('Error sending product:', error);
      }
  });

  };
  

  const handleCheck = () => {
    console.log("ok");

    setChecked(false);
  };

  return (
    <form ref={form} className="form" >
      <header>
        <div className="TitleSecure">
          <h3>Payment Details </h3>
          <GrSecure className="secureIcon" />
        </div>
        <div className="Amont">
          <p> Amount: </p>
          <label className="price">{price ? `$ ${parseFloat(price) + 5.00 + 2.00}` : "Loading..."}</label>
        </div>
      </header>
      <main>
        {meta.isTouched && meta.error ? (
          <span className="span">Error: {meta.error}</span>
        ) : (
          <span className="span"></span>
        )}
        <div className="NomDuClient">
          <label> Full Name of Client </label>
          <input name="NomDuClient" onChange={handleChange} />
        </div>
        <div className="NumDeCarte">
          <label> Card Number </label>
          <input
            {...getCardNumberProps({ onChange: handleChangeCardNumber })}
            placeholder="Valid Card Number"
            name="cardNumber"
            maxLength="19"
            value={cardNumber}
          />
        </div>
        <div className="DateEtCvc">
          <div className="Date">
            <label> Expiration Date </label>
            <input
              {...getExpiryDateProps({ onChange: handleChange })}
              placeholder="MM/AA"
              name="expiryDate"
            />
          </div>
          <div className="CvC">
            <label> CvC</label>
            <input
              {...getCVCProps({ onChange: handleChange })}
              name="cvc"
              maxLength="3"
            />
          </div>
        </div>
        <div className="terme">
          <input type="checkbox" onChange={handleCheck} />
          <p className="TermeConfidentialite">
            Accept terms of <Link to="#">confidientiality</Link>
          </p>
        </div>
        <input type="submit" value="Submit" className="btn" onClick={handleSubmit} />
      </main>
      <footer>
        <img className="img1" src="/images/methode.jpg" alt="" />
        <img className="img2" src="/images/mir.png" alt="" />
      </footer>
    </form>
  );
}
