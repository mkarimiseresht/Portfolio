import React from "react";
import './about.css';
import bg from '../../assets/photo2.jpg';

const About = () => {
    return (
        <section id='about'>
            <div className="aboutContent">
                <span className="Introduction">My name is Mohammad.</span>
            </div>
            <img src={bg} alt="Profile" className="bg"></img>
        </section>
    )
}

export default About;