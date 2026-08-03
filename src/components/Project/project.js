import React, { useMemo, useState } from "react";
import "./project.css";
import featuredProjects from "../../data/featuredProjects";
import ProjectCard from "../ProjectCard/ProjectCard";
import useScrollReveal from "../../hooks/useScrollReveal";

const SKELETON_COUNT = 6;

const Project = ({ repos, status }) => {
  const revealRef = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState("All");

  const languages = useMemo(() => {
    const set = new Set(repos.map((r) => r.language).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (activeFilter === "All") return repos;
    return repos.filter((r) => r.language === activeFilter);
  }, [repos, activeFilter]);

  return (
    <section id="project" className="projects">
      <div className="projects__inner reveal" ref={revealRef}>
        <p className="section-eyebrow mono">02 / Work</p>
        <h2 className="section-title">Projects</h2>

        <h3 className="projects__subheading">Featured</h3>
        <div className="projects__grid">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.title} {...p} featured />
          ))}
        </div>

        <div className="projects__github-header">
          <h3 className="projects__subheading">From GitHub</h3>
          {status === "success" && languages.length > 1 && (
            <div className="projects__filters">
              {languages.map((lang) => (
                <button
                  key={lang}
                  className={`projects__filter ${activeFilter === lang ? "projects__filter--active" : ""}`}
                  onClick={() => setActiveFilter(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {status === "loading" && (
          <div className="projects__grid">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div className="project-skeleton" key={i} />
            ))}
          </div>
        )}

        {status === "error" && (
          <p className="projects__empty">
            Couldn't load repos from GitHub right now (the public API is rate-limited). Refresh in a bit, or
            browse directly on{" "}
            <a href="https://github.com/mkarimiseresht" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            .
          </p>
        )}

        {status === "success" && filteredRepos.length === 0 && (
          <p className="projects__empty">No repos match that filter yet.</p>
        )}

        {status === "success" && filteredRepos.length > 0 && (
          <div className="projects__grid">
            {filteredRepos.map((r) => (
              <ProjectCard
                key={r.id}
                title={r.name}
                description={r.description}
                tags={[r.language, ...r.topics].filter(Boolean)}
                repoUrl={r.url}
                liveUrl={r.homepage}
                stars={r.stars}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;
