import React from "react";
import "./skills.css";
import profile from "../../data/profile";
import useScrollReveal from "../../hooks/useScrollReveal";

const Skills = () => {
  const revealRef = useScrollReveal();

  return (
    <section id="skills" className="skills">
      <div className="skills__inner reveal" ref={revealRef}>
        <p className="section-eyebrow mono">01 / Toolkit</p>
        <h2 className="section-title">Skills</h2>
        <div className="skills__grid">
          {profile.skills.map((skill, i) => (
            <div className="skills__chip" key={skill} style={{ transitionDelay: `${i * 40}ms` }}>
              <span className="skills__chip-index mono">{String(i + 1).padStart(2, "0")}</span>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
