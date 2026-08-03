import React from "react";
import "./footer.css";
import { Link } from "react-scroll";
import profile from "../../data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon, ArrowUpIcon } from "../Icons/Icons";

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <span className="footer__copy mono">
        © {new Date().getFullYear()} {profile.name}
      </span>

      <div className="footer__social">
        <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GitHubIcon width={18} height={18} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon width={18} height={18} />
        </a>
        <a href={`mailto:${profile.email}`} aria-label="Email">
          <MailIcon width={18} height={18} />
        </a>
      </div>

      <Link to="about" smooth={true} duration={500} className="footer__top" aria-label="Back to top">
        <ArrowUpIcon width={16} height={16} />
      </Link>
    </div>
  </footer>
);

export default Footer;
