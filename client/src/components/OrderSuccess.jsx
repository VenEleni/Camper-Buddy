import React from "react";
import logo from "../assets/logo.png";
import { Link} from "react-router-dom";

function OrderSuccess() {
    return (
        <div>
            <a href="/">
          <img src={logo} alt="logo" style={{ width: "100px" }} />
        </a>
        <h1>Order Success</h1>
        <p>Your order has been successfully placed.</p>
        <p>We will inform you for the process of you order via mails!</p>
        <p>Thank you and hope to see you again soon!</p>
        <Link to="/">Return to Home</Link>
        </div>
    );
    }

export default OrderSuccess;