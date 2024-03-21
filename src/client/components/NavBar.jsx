import React from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css";
import Hamburger from "./Hamburger";
import { useState } from "react";
// import logo??

export default function NavBar({size, setShow, setToken, cookies}) {
  return (
    <header className="navbar-container">
      
      <section className="burger-container">
        <Hamburger cookies={cookies} setToken={setToken}/>
      </section>
      
      <h1 className="nav-logo">Little Seed, BIG Garden</h1>
      
      <nav>

        <Link to="/" onClick={() => setShow(true)} className="material-symbols-outlined home-icon">home_and_garden</Link>
        <Link to="/cart" className="material-symbols-outlined cart-icon" onClick={() => setShow(false)}> garden_cart</Link>
        <span>{size}</span>

      </nav>

    </header>
  );
}
