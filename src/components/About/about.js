import React, { useEffect, useState } from "react";
import "./about.css";
import { Link } from "react-scroll";
import profile from "../../data/profile";
import useScrollReveal from "../../hooks/useScrollReveal";
import { ArrowUpRightIcon } from "../Icons/Icons";

const SPARK_POINTS = "0,60 40,45 80,52 120,20 160,34 200,10 240,26 280,4 320,18";

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

  const stats = [
    { label: "public repos", value: githubProfile?.publicRepos },
    { label: "followers", value: githubProfile?.followers },
    { label: "skills", value: profile.skills.length },
  ];

  return (
    <section id="about" className="about">
      <div className="about__spark" aria-hidden="true">
        <svg viewBox="0 0 320 70" preserveAspectRatio="none">
          <polyline
            points={SPARK_POINTS}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="about__spark-line"
          />
        </svg>
      </div>

      <div className="about__content" ref={revealRef}>
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
    </section>
  );
};

export default About;
