import React from "react";
import './navbar.css';
import {Link} from 'react-scroll'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="menu">
                <Link className="menuListItem">Home</Link>
                <Link activeClass="active" to='about' spy={true} smooth={true} offset={-100} duration={500} className="menuListItem">About</Link>
                <Link activeClass="active" to='project' spy={true} smooth={true} offset={-100} duration={500} className="menuListItem">Portfolio</Link>
                <Link className="menuListItem">Resume</Link>
                <Link className="menuListItem">Contact</Link>
            </div>
        </nav>   
    )
}

export default Navbar;