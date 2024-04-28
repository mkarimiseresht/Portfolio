import React from "react";
import './about.css';
import bg from '../../assets/photo.jpg';

const About = () => {
    return (
        <section id='about'>
            <div className="aboutContent">
                <span className="Introduction">My name is Mohammad.</span>
            </div>
            <img src={bg} alt="Profile Photo" className="bg"></img>
        </section>
    )
}

export default About;