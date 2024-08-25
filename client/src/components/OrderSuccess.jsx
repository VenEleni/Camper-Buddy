import React from "react";
import logo from "../assets/logo.png";
import { Link} from "react-router-dom";

function OrderSuccess() {
    return (
        <div className="left-96 ml-40 top-24">
            <a href="/">
          <img src={logo} alt="logo" style={{ width: "100px" }} />
        </a>
        <h1 className="text-black">Order Success</h1>
        <p  className="text-black">Your order has been successfully placed.</p>
        <p  className="text-black">We will inform you for the process of you order via mails!</p>
        <p  className="text-black">Thank you and hope to see you again soon!</p>
        <Link to="/"  className="text-black">Return to Home</Link>
        </div>
    );
    }

export default OrderSuccess;