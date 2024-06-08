import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './Shipping.css';

const Shipping = () => {
    const navigate = useNavigate();
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
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
                }
            } catch (error) {
                console.error("Error fetching cart count:", error);
            }
        };

        fetchCartData();
    }, []);

    const formik = useFormik({
        initialValues: {
            recipientName: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object({
            recipientName: Yup.string().required('Required'),
            address: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            zipCode: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
            phoneNumber: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            console.log(values);
            localStorage.setItem("shipping", JSON.stringify(values));
            navigate('/checkout');
        },
    });

    return (
        <div className="form-container">
            <form className="address-form" onSubmit={formik.handleSubmit}>
                <div className="form-row">
                    <label>Recipient Name:</label>
                    <input
                        type="text"
                        name="recipientName"
                        {...formik.getFieldProps('recipientName')}
                    />
                    {formik.touched.recipientName && formik.errors.recipientName ? (
                        <div className="error">{formik.errors.recipientName}</div>
                    ) : null}
                </div>
                <div className="form-row">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        {...formik.getFieldProps('address')}
                    />
                    {formik.touched.address && formik.errors.address ? (
                        <div className="error">{formik.errors.address}</div>
                    ) : null}
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            {...formik.getFieldProps('city')}
                        />
                        {formik.touched.city && formik.errors.city ? (
                            <div className="error">{formik.errors.city}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label>State:</label>
                        <input
                            type="text"
                            name="state"
                            {...formik.getFieldProps('state')}
                        />
                        {formik.touched.state && formik.errors.state ? (
                            <div className="error">{formik.errors.state}</div>
                        ) : null}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Zip Code:</label>
                        <input
                            type="text"
                            name="zipCode"
                            {...formik.getFieldProps('zipCode')}
                        />
                        {formik.touched.zipCode && formik.errors.zipCode ? (
                            <div className="error">{formik.errors.zipCode}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label>Country:</label>
                        <input
                            type="text"
                            name="country"
                            {...formik.getFieldProps('country')}
                        />
                        {formik.touched.country && formik.errors.country ? (
                            <div className="error">{formik.errors.country}</div>
                        ) : null}
                    </div>
                </div>
                <div className="form-row">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        {...formik.getFieldProps('phoneNumber')}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <div className="error">{formik.errors.phoneNumber}</div>
                    ) : null}
                </div>
                <button type="submit">Proceed to Checkout</button>
            </form>
            <div className="summary-details">
                <div className="subtotal">
                    <span className="subtotal-label">Subtotal: </span>
                    <span className="subtotal-amount">${price}</span>
                </div>
                <div className="shipping">
                    <span className="shipping-label">Shipping: </span>
                    <span className="shipping-amount">$5.00</span>
                </div>
                <div className="tax">
                    <span className="tax-label">Tax: </span>
                    <span className="tax-amount">$2.00</span>
                </div>
                <div className="total">
                    <span className="total-label">Total: </span>
                    <span className="total-amount">
                        ${(parseFloat(price) + 5.00 + 2.00).toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
