import React from "react";
import { Link, useNavigate  } from 'react-router-dom';
import logo from "../assets/logo.png";
import './NavBar.css'

function NavBar() {
  return (
    <nav className="navBarContainer">
      
        <div className="navbar-brand">
          <a href="/">
            <img src={logo} alt="logo" style={{ width: "100px" }} />
          </a>
        </div>
        <div className="navbar-links">
            <Link to="">E-shop</Link>
            <Link to="">Blog</Link>
            <Link to="">Forum</Link>
      </div>
      <div className="login_nav">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default NavBar;
