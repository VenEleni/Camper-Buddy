import React, { useState } from 'react';
import "./Login.css"
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';
import googleLogo from "../assets/google_logo.png";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
      });
      const navigate = useNavigate();

      const dispatch = useDispatch();
      const auth = useSelector((state) => state.auth);

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
        navigate("/");
      };


    return (
        <div className="login-form-body">
            <p className="login_quote">Shop premium camping equipment,
            and explore travel blogs at Camper Buddy.</p>
        <form onSubmit={handleSubmit}>
      <h2>Login</h2>
        <div className="input-field">
        <input type="text" id="email" value={formData.email} onChange={handleChange}  required/>
        <label>Enter your email</label>
      </div>
      <div className="input-field">
        <input type="password" id="password" value={formData.password} onChange={handleChange} required/>
        <label>Enter your password</label>
      </div>
      {auth.error && <p className="error-msg">{auth.error}</p>}
      <button className="login_form_button" type="submit">Log In</button>
      <div className="line-div">
      <div className="line"></div>
      <p className="or-h4">OR</p>
      <div className="line"></div>
      </div>
      
      <div className="media-options">
                    <a href="http://localhost:8080/auth/google" className="field google">
                        <img src={googleLogo} alt="Google Logo" className="google-img"/>
                        <span>Login via Google</span>
                    </a>
                </div>
      <div className="register">
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </form>
      </div>
    )
}

export default LoginForm;