import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <React.Fragment>
      <header>
        <p>header</p>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </header>
    </React.Fragment>
  )
}

export default Header;