import React from "react";
import './navbar.css';
import {Link} from 'react-scroll'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="menu">
                <Link className="menuListItem">Home</Link>
                <Link className="menuListItem">About</Link>
                <Link className="menuListItem">Portfolio</Link>
                <Link className="menuListItem">Resume</Link>
                <Link className="menuListItem">Contact</Link>
            </div>
        </nav>   
    )
}

export default Navbar;