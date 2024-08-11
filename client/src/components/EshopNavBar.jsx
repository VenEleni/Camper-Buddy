import React from "react";
import logo from "../assets/logo.png";
import "./EshopNavBar.css"
import 'bootstrap-icons/font/bootstrap-icons.css';

const EshopNavBar = () => {
  return (
    <nav className="eshop_nav">
      <div className=" navbar-brand  eshop-logo">
        <a href="/">
          <img src={logo} alt="logo" style={{ width: "100px" }} />
        </a>
      </div>
      <div>
        <select id="Camping Tents" name="Camping Tents" required>
          <option value="" disabled selected>
            Camping Tents
          </option>
          <option value="Winter Tents">Winter Tents</option>
          <option value="Summer Tents">Summer Tents</option>
          <option value="4-Season Tents">4-Season Tents</option>
          <option value="Hammock Tents">Hammock Tents</option>
          <option value="Shade Tents">Shade Tents</option>
        </select>
        <select id="Camping Essentials" name="Camping Essentials" required>
          <option value="" disabled selected>
            Camping Essentials
          </option>
          <option value="Sleeping Equipment">Sleeping Equipment</option>
          <option value="Survival Supplies">Survival Supplies</option>
          <option value="Lighting Products">Lighting Products</option>
          <option value="Cooking & Food Equipment">
            Cooking & Food Equipment
          </option>
        </select>
        <select id="Accessories & Extras" name="Accessories & Extras" required>
          <option value="" disabled selected>
          Accessories & Extras
          </option>
          <option value="Personal Care">Personal Care</option>
          <option value="Backpacks">Backpacks</option>
          <option value="Clothing">Clothing</option>
          <option value="Camping Furniture">Camping Furniture</option>
          <option value="Other">Other</option>
        </select>
        <div>
          <a href="/" className="bi bi-bag"></a>
          <a href="/" className="bi bi-heart-fill"></a>
          <a href="/createproduct" className="bi bi-plus-circle"></a>
        </div>
      </div>
    </nav>
  );
};

export default EshopNavBar;
