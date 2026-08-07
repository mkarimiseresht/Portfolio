import React, { useEffect, useState } from "react";
import "./about.css";
import { Link } from "react-scroll";
import profile from "../../data/profile";
import useScrollReveal from "../../hooks/useScrollReveal";
import useParallax from "../../hooks/useParallax";
import { ArrowUpRightIcon } from "../Icons/Icons";
import photo from "../../assets/photo2.jpg";

const TypedTagline = ({ text }) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span className="typed">
      {display}
      <span className="typed__cursor">|</span>
    </span>
  );
};

const About = ({ githubProfile, status }) => {
  const revealRef = useScrollReveal();
  const parallaxRef = useParallax(0.15, "x", 70);

  const stats = [
    { label: "public repos", value: githubProfile?.publicRepos },
    { label: "followers", value: githubProfile?.followers },
    { label: "skills", value: profile.skills.length },
  ];

  return (
    <section id="about" className="about">
      <div className="about__grid">
        <div className="about__content reveal" ref={revealRef}>
          <p className="about__eyebrow mono">Portfolio / {profile.role}</p>
          <h1 className="about__name">{profile.name}</h1>
          <h2 className="about__tagline">
            <TypedTagline text={profile.tagline} />
          </h2>
          <p className="about__bio">{profile.bio}</p>

          <div className="about__cta">
            <Link to="project" smooth={true} duration={500} offset={-80} className="btn btn--primary">
              View projects
            </Link>
            <Link to="contact" smooth={true} duration={500} offset={-80} className="btn btn--ghost">
              Get in touch
            </Link>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost about__resume"
            >
              Resume <ArrowUpRightIcon width={14} height={14} />
            </a>
          </div>

          <div className="about__stats" aria-live="polite">
            {stats.map((s) => (
              <div className="about__stat" key={s.label}>
                <span className="about__stat-value mono">
                  {status === "loading" ? "—" : s.value ?? "—"}
                </span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about__photo-wrap in-view" aria-hidden="false">
          <div className="about__photo-frame" ref={parallaxRef}>
            <div className="about__mesh" aria-hidden="true">
              <div className="about__mesh-glow" />
              <svg className="about__mesh-grid" viewBox="0 0 240 240" preserveAspectRatio="xMidYMid slice">
                {Array.from({ length: 13 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 20} x2="240" y2={i * 20} />
                ))}
                {Array.from({ length: 13 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="240" />
                ))}
                <circle cx="60" cy="100" r="2.6" />
                <circle cx="160" cy="60" r="2" />
                <circle cx="180" cy="160" r="2.8" />
                <circle cx="100" cy="180" r="2" />
              </svg>
            </div>
            <img src={photo} alt={profile.name} className="about__photo" />
            <span className="about__photo-corner about__photo-corner--tl" />
            <span className="about__photo-corner about__photo-corner--tr" />
            <span className="about__photo-corner about__photo-corner--bl" />
            <span className="about__photo-corner about__photo-corner--br" />
          </div>
          <div className="about__photo-tag mono">{profile.role}</div>
        </div>
      </div>
    </section>
  );
};

export default About;