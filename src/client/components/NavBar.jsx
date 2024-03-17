import React from "react";
import { Link } from "react-router-dom";
import './styles/navbar.css'
import Hamburger from "./Hamburger";
import {useState} from 'react'
// import logo??

export default function NavBar() {
  // const [hamburgerOpen, setHamburgerOpen] = useState(false)
  // const toggleHamburger = () => {
  //   setHamburgerOpen(!hamburgerOpen)
  // }
  return (
    <header className="navbar-container">
      <section>
        <Hamburger/>
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
