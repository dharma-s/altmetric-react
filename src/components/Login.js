// Login.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const history = useHistory();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});


    const validateForm = () => {
        let errorsObj = {};
        if (!credentials.username) {
            errorsObj.username = 'Username is required';
        }
        if (!credentials.password) {
            errorsObj.password = 'Password is required';
        }
        setErrors(errorsObj);
        return Object.keys(errorsObj).length === 0;
    };
    const handleInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post('http://localhost:8000/api-token-auth/', credentials)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                history.push('/customers');
                // Redirect or set state for logged-in user
            })
            .catch(error => {
                console.error('Login error: ', error);
            });
        }
    };

    return (
        <div className="registration-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
                    {errors.username && <span className="error-message">{errors.username}</span>}
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <button type="submit">Login</button> or 
                <Link to={'/signup'}><button type="button">Signup</button></Link>
            </form>
            
            
        </div>
    );
};

export default Login;
