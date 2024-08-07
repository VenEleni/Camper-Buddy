import React from "react";
import "./Login.css"
import googleLogo from "../assets/google_logo.png";

const LoginForm = () => {
    return (
        <div className="login-form-body">
            <p className="login_quote">Shop premium camping equipment,
            and explore travel blogs at Camper Buddy.</p>
        <form action="#">
      <h2>Login</h2>
        <div className="input-field">
        <input type="text" required/>
        <label>Enter your email</label>
      </div>
      <div className="input-field">
        <input type="password" required/>
        <label>Enter your password</label>
      </div>
      <button className="login_form_button" type="submit">Log In</button>
      <div className="line-div">
      <div className="line"></div>
      <p className="or-h4">OR</p>
      <div className="line"></div>
      </div>
      
      <div className="media-options">
                    <a href="#" className="field google">
                        <img src={googleLogo} alt="" className="google-img"/>
                        <span>Login with Google</span>
                    </a>
                </div>
      <div className="register">
        <p>Don't have an account? <a href="#">Register</a></p>
      </div>
    </form>
      </div>
    )
}

export default LoginForm;