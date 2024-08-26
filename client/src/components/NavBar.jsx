import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import "beercss/dist/cdn/beer.min.css";
import "./NavBar.css";
import { logout } from "../actions/authActions";

function NavBar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <nav className="navBarContainer">
      <div className="navbar-brand">
        <Link to="/">
          <img src={logo} alt="logo" style={{ width: "100px" }} />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/eshop">E-shop</Link>
        <Link to="/blogs">Blog</Link>
        <Link to="/forumerror">Forum</Link>
      </div>

      {auth.isAuthenticated ? (
        <div className="user_nav flex leaveBox">
          <span className="user_nav_span top-4">Hello traveller!</span>
          <p className="cursor-pointer " onClick={handleLogOut}>
            Leave..
          </p>
        </div>
      ) : (
        <div className="login_nav">
          <Link to="/login" className="login_link">
            Login
            <i className="small login_icon">
              <svg viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z"></path>
              </svg>
            </i>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;