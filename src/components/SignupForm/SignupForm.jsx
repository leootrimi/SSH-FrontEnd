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
        <h1>Enter your personal details</h1>
        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          <div className="input-row">
          <div className="input-box">
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
          </div>

          <div className="input-box">
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
          </div>
          </div>


          <div className="input-row">
          <div className="input-box">
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
          </div>

          <div className="input-box">
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          </div>
          </div>


          <div className="input-row">
          <div className="input-box">
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
          </div>

          <div className="input-box">
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Confirm password" />
          </div>
          </div>



         
          <div className="input-row">
          <div className="input-box">
          <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
          </div>
          <div className="input-box">
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
          </div>
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
