import React from "react";
import "./Homepage.css";

import NavBar from "../components/NavBar";

function Homepage() {
  return (
    <div className="homeBody">
    <NavBar/>
      <div  className="homepageContainer" >
        <h3 className="homeQuote">
          Pack light, <br></br>
          travel far, <br></br>
          and explore the wonders of the world
        </h3>
      </div>
    </div>
  );
}

export default Homepage;
