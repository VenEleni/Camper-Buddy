import React from "react";
import logo from "../assets/logo.png";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const EshopNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className=" navbar-brand  eshop-logo">
        <a href="/">
          <img src={logo} alt="logo" style={{ width: "100px" }} />
        </a>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
  <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Camping Tents
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Winter Tents</a>
          <a className="dropdown-item" href="#">Summer Tents</a>
          <a className="dropdown-item" href="#">4-Season Tents</a>
          <a className="dropdown-item" href="#">Hammock Tents</a>
          <a className="dropdown-item" href="#">Shade Tents</a>
        </div>
      </li>
      </ul>
      <ul className="navbar-nav mr-auto">
  <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Camping Essentials
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Sleeping Equipment</a>
          <a className="dropdown-item" href="#">Survival Supplies</a>
          <a className="dropdown-item" href="#">Lighting Products</a>
          <a className="dropdown-item" href="#">Cooking & Food Equipment</a>
        </div>
      </li>
      </ul>
      <ul className="navbar-nav mr-auto">
  <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Accessories & Extras
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Personal Care</a>
          <a className="dropdown-item" href="#">Backpacks</a>
          <a className="dropdown-item" href="#">Clothing</a>
          <a className="dropdown-item" href="#">Camping Furniture</a>
          <a className="dropdown-item" href="#">Other</a>
        </div>
      </li>
      </ul>
      <div>
      <i class="bi bi-bag"></i>
      </div>
      <div>
      <i class="bi bi-heart-fill"></i>
      </div>
      </div>
      </nav>
  );
};

export default EshopNavBar;
