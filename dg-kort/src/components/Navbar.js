import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/images/logo.png";

/**
 * Navbar component for the application
 * @param {items} props : An array of strings to be displayed as nav items
 * @returns : A navbar component
 */
const Navbar = (props) => {
  const navItems = props.navItems.map((item, key) => {
    return (
      <li className="nav-item" key={key}>
        <a className="nav-link" href="/">
          {item}
        </a>
      </li>
    );
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={Logo} alt={props.title} className="img-fluid" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">{navItems}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
