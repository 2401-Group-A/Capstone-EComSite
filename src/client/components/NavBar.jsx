import React from "react";
import { Link } from "react-router-dom";
import './styles/navbar.css'
// import logo??

export default function NavBar() {
  
  return (
    <header className="navbar-container">
      <section>
        <h1 className="nav-logo">LOGO</h1>
      </section>

      <nav>
        <Link to="/seeds">Home</Link>
        <Link to="/account">Account</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}
