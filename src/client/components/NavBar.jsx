import React from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css";
import Hamburger from "./Hamburger";
import { useState } from "react";
// import logo??

export default function NavBar({size, setShow}) {
  return (
    <header className="navbar-container">
      
      <section className="burger-container">
        <Hamburger />
      </section>
      
      <h1 className="nav-logo">LOGO</h1>
      
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart" className="material-symbols-outlined" onClick={() => setShow(false)}> garden_cart</Link>
        <span>{size}</span>
      </nav>

    </header>
  );
}
