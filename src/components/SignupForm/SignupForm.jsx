import React, { useState } from 'react';
import axios from 'axios';
import './signup.scss'; // Import SCSS file

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    state: '',
    zipCode: '',
    role: 'User'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/register', formData);
      console.log(response.data); // Handle success
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div className="signup-form"> {/* Add the 'signup-form' class */}
      <div className="wrapper"> {/* Add the 'wrapper' class */}
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
          <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
          <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Zip Code" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
