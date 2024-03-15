import React from 'react'
import { Link } from 'react-router-dom'
// import logo??


export default function NavBar() {
    return (
        <header>
            <section>
        <h1>LOGO</h1>
            </section>
        <nav>
            <Link to='/seeds'>Home</Link>
            <Link to='/account'>Account</Link>
            <Link to='/cart'>Cart</Link>
        </nav>
        </header>
)}