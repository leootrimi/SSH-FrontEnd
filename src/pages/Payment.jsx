import React, { useEffect, useState } from "react";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { GrSecure } from "react-icons/gr";
import { jwtDecode } from "jwt-decode";
import { usePaymentInputs } from "react-payment-inputs";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (meta.isTouched && meta.error) ||
      Number(cardNumber.length) < 19 ||
      cardNumber.trim().length === 0 ||
      details.expiryDate.trim().length === 0 ||
      details.cvc.trim().length === 0 ||
      details.NomDuClient.trim().length === 0 ||
      checked === true
    ) {
      setChecked(true);
      console.log("not submit");
    } else {
      setChecked(false);

      emailjs
        .sendForm(
          "service_pduy8oo",
          "template_be4vpep",
          form.current,
          "d7GFUxt5sOvLttX-o"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      navigate("/Validation");
    }
  };

  const handleCheck = () => {
    console.log("ok");

    setChecked(false);
  };

  return (
    <form ref={form} className="form" onSubmit={handleSubmit}>
      <header>
        <div className="TitleSecure">
          <h3>Payment Details </h3>
          <GrSecure className="secureIcon" />
        </div>
        <div className="Amont">
          <p> Amount: </p>
          <label className="price">{price ? `$${price}` : "Loading..."}</label>
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
        <input disabled={checked} type="submit" value="Submit" className="btn" />
      </main>
      <footer>
        <img className="img1" src="/images/methode.jpg" alt="" />
        <img className="img2" src="/images/mir.png" alt="" />
      </footer>
    </form>
  );
}
