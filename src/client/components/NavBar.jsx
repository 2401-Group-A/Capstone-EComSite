import React from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css";
import Hamburger from "./Hamburger";
import { useState } from "react";
// import logo??

export default function NavBar() {
  return (
    <header className="navbar-container">
      <section className="burger-container">
        <Hamburger />
      </section>
      <h1 className="nav-logo">LOGO</h1>
      <nav>
        <Link to="/"     className="material-symbols-outlined home-icon">home_and_garden</Link>
        {/* <Link to="/account">Account</Link> */}
        <Link to="/cart" className="material-symbols-outlined cart-icon">garden_cart</Link>
      </nav>
    </header>
  );
}
