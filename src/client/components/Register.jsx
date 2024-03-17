import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [message, setMessage] = useState('');

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleStreetChange = (e) => {
        setStreet(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handleZipChange = (e) => {
        setZip(e.target.value);
    };

    const registerUser = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName,
                    address: street,
                    city,
                    state,
                    zip
                })
            });
            const result = await response.json();
            setMessage(result.message);
            if (!response.ok) {
                throw new Error(result.message);
            }
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
            setStreet('');
            setCity('');
            setState('');
            setZip('');
        } catch (err) {
            console.error(`Error during registration: ${err}`);
            setMessage(err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser();
    };

    return (
        <div className='register-container'> 
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor='firstName'>First Name:</label>
                    <input type='text' id='firstName' value={firstName} onChange={handleFirstNameChange} required />
                </div>
                <div>
                    <label htmlFor='lastName'>Last Name:</label>
                    <input type='text' id='lastName' value={lastName} onChange={handleLastNameChange} required />
                </div>
                <div>
                    <label htmlFor='street'>Street Address:</label>
                    <input type='text' id='street' value={street} onChange={handleStreetChange} required />
                </div>
                <div>
                    <label htmlFor='city'>City:</label>
                    <input type='text' id='city' value={city} onChange={handleCityChange} required />
                </div>
                <div>
                    <label htmlFor='state'>State:</label>
                    <input type='text' id='state' value={state} onChange={handleStateChange} required />
                </div>
                <div>
                    <label htmlFor='zip'>Zip Code:</label>
                    <input type='text' id='zip' value={zip} onChange={handleZipChange} required />
                </div>
                <div className="form-footer">
                    <Link to="/login" className='register-route'>Already have an account? Login</Link>
                    <button type='submit'>Register</button>
                </div>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Register;
