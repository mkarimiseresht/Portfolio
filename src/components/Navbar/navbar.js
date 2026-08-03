import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-scroll";
import { useTheme } from "../../context/ThemeContext";
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from "../Icons/Icons";
import profile from "../../data/profile";

const NAV_LINKS = [
  { to: "about", label: "Home" },
  { to: "skills", label: "Skills" },
  { to: "project", label: "Projects" },
  { to: "contact", label: "Contact" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <Link
        to="about"
        spy={true}
        smooth={true}
        duration={500}
        className="navbar__brand mono"
        onClick={() => setMenuOpen(false)}
      >
        MK.
      </Link>

      <div className="navbar__menu navbar__menu--desktop">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="menuListItem"
          >
            {link.label}
          </Link>
        ))}
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="menuListItem"
        >
          Resume
        </a>
      </div>

      <div className="navbar__actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <SunIcon width={18} height={18} /> : <MoonIcon width={18} height={18} />}
        </button>
        <button
          className="navbar__burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-60}
            duration={500}
            className="menuListItem"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="menuListItem"
          onClick={() => setMenuOpen(false)}
        >
          Resume
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
