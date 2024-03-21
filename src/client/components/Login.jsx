import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ token, setToken, cookies }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

useEffect(()=>{
  if(token) {
    setTimeout(function (){
      navigate('/account')
    }, 1000)
  }
}, [])

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw result;
      }
      cookies.set('login_token', result.token)
      setToken(result.token)
      setMessage(result.message);
      setEmail('');
      setPassword('');
      navigate('/account')
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  };


  return (
    <div className='login-container'>
      {/* Form Title */}
      <h2>Login</h2>
      {/* Email Input */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        {/* Password Input */}
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {/* Buttons */}
        <div className='form-footer'>
          <Link to='/register' className='register-route'>
            <button type='button'>Sign-up</button>
          </Link>
          <button type='submit'>Login</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
