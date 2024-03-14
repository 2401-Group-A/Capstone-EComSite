import { React } from React;
import { Link } from 'react-router-dom'

// import logo??


export default function NavBar() {
    return (
        <header>
            <section>
        <h1><img id='logo-image' src={bookLogo}/>Seeds Logo</h1>
            </section>
        <nav>
            <Link to='/seeds'>Home</Link>
            <Link to='/account'>Account</Link>
            <Link to='/cart'>Cart</Link>
        </nav>
        </header>
)}