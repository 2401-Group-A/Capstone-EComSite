import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';
import Hamburger from './Hamburger';
import { useState } from 'react';

export default function NavBar({ setToken, cookies}) {
  return (
    <header className='navbar-container'>
      <section className='burger-container'>
        <Hamburger cookies={cookies} setToken={setToken} />
      </section>
      <div className='logo-and-text'>
        <h1 className='nav-header-text'>
          <img
            className='nav-logo'
            src='src/client/assets/icons/lsbg_logo_new.png'
            alt='Little Seed, Big Garden logo'
          />
          Little Seed, <span className='big-text'>&nbsp;BIG&nbsp;</span>Garden
        </h1>
      </div>
      <nav>

        <Link to="/"  className="material-symbols-outlined home-icon">home_and_garden</Link>
        <Link to="/cart" className="material-symbols-outlined cart-icon" > garden_cart</Link>
        {/* span is for number next to the cart  */}
        {/* <span>{size}</span> */}
        

      </nav>
    </header>
  );
}


