import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';
import Hamburger from './Hamburger';
import { useState } from 'react';
// import logo??

export default function NavBar({ size, setShow, setToken, cookies }) {
  return (
    <header className='navbar-container'>
      <section className='burger-container'>
        <Hamburger cookies={cookies} setToken={setToken} />
      </section>
      <div className='logo-and-text'>
        <img
          className='nav-logo'
          src='src/client/assets/icons/lsbg_logo_new.png'
          alt='Little Seed, Big Garden logo'
        />
        <h1 className='nav-header-text'>Little Seed, <span className='big-text'>&nbsp;BIG&nbsp;</span>Garden</h1>
      </div>
      <nav>
        <Link
          to='/'
          onClick={() => setShow(true)}
          className='material-symbols-outlined home-icon'
        >
          home_and_garden
        </Link>
        <Link
          to='/cart'
          className='material-symbols-outlined cart-icon'
          onClick={() => setShow(false)}
        >
          {' '}
          garden_cart
        </Link>
        <span>{size}</span>
      </nav>
    </header>
  );
}
