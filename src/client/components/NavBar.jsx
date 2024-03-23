import React from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css";
import Hamburger from "./Hamburger";
import { useState } from "react";
// import logo??

export default function NavBar({ size, setToken, cookies}) {
  return (
    <header className="navbar-container">
      
      <section className="burger-container">
        <Hamburger cookies={cookies} setToken={setToken}/>
      </section>
      
      <h1 className="nav-logo">Little Seed, BIG Garden</h1>
      
      <nav>

        <Link to="/"  className="material-symbols-outlined home-icon">home_and_garden</Link>
        <Link to="/cart" className="material-symbols-outlined cart-icon" > garden_cart</Link>
        {/* span is for number next to the cart  */}
        <span>{size}</span>
        

      </nav>

    </header>
  );
}


