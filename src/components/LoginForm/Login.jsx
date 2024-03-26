import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.scss"
import { Link } from 'react-router-dom'; 
import logo  from "../../assets/images/logoF.avif"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username: username,
        password: password
      };
      
      console.log('Sending login request...');
      
      const response = await axios.post('http://localhost:8080/login', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Login response:', response);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/')
      } else {
        console.error('Login failed:', response.statusText);
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-form">
      <div className="wrapper">
        <h1>        <div className="logo"><img src={logo} alt="" /></div>
</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
         <div className="for-reg">
         <div className='remember-forgot'>
          <Link to="/forgot">Forgot Password!</Link>
          </div>
          <div className='reg'>
          <Link to="/register">Don't have an account?</Link>
          </div>
         </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
