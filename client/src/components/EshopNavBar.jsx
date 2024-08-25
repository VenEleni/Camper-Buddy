import React from "react";
import logo from "../assets/logo.png";
import "./EshopNavBar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const EshopNavBar = ({ onCategoryChange }) => {
  const auth = useSelector((state) => state.auth);

  const handleCategorySelect = (e) => {
    const category = e.target.name;
    const subcategory = e.target.value;
    onCategoryChange(category, subcategory);
  };

  return (
    <nav className="eshop_nav">
      <div className=" navbar-brand  eshop-logo">
        <Link to="/">
          <img src={logo} alt="logo" style={{ width: "100px" }} />
        </Link>
      </div>
      <div className="selection_container w-full d-flex">
        <select
          id="Camping Tents"
          name="Camping Tents"
          onChange={handleCategorySelect}
          className="select_navBar"
        >
          <option value="Camping Tents">Camping Tents</option>
          <option value="Winter Tents">Winter Tents</option>
          <option value="Summer Tents">Summer Tents</option>
          <option value="4-Season Tents">4-Season Tents</option>
          <option value="Hammock Tents">Hammock Tents</option>
          <option value="Shade Tents">Shade Tents</option>
        </select>
        <select
          id="Camping Essentials"
          name="Camping Essentials"
          onChange={handleCategorySelect}
          className="select_navBar"
        >
          <option value="Camping Essentials">Camping Essentials</option>
          <option value="Sleeping Equipment">Sleeping Equipment</option>
          <option value="Survival Supplies">Survival Supplies</option>
          <option value="Lighting Products">Lighting Products</option>
          <option value="Cooking & Food Equipment">
            Cooking & Food Equipment
          </option>
        </select>
        <select
          id="Accessories & Extras"
          name="Accessories & Extras"
          onChange={handleCategorySelect}
          className="select_navBar"
        >
          <option value="Accessories & Extras">Accessories & Extras</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Backpacks">Backpacks</option>
          <option value="Clothing">Clothing</option>
          <option value="Camping Furniture">Camping Furniture</option>
          <option value="Other">Other</option>
        </select>
        <div className="ml-32 right-5 flex">
          {auth.isAuthenticated && (
            <Link
              to="/cart"
              className="bi bi-bag text-black no-underline mr-3"
            ></Link>
          )}
          {auth.isAuthenticated && auth.user && auth.user.role === "admin" && (
            <div className="flex">
              <Link
                to="/createproduct"
                className="bi bi-plus-circle text-black no-underline"
              ></Link>
              <Link to="/orders" className=" text-black no-underline ml-3">
                See Orders..
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default EshopNavBar;
