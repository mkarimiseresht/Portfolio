import React from "react";
import "./ProjectCard.css";
import { GitHubIcon, ArrowUpRightIcon, StarIcon } from "../Icons/Icons";

const ProjectCard = ({ title, description, tags = [], repoUrl, liveUrl, stars, featured }) => (
  <article className={`project-card ${featured ? "project-card--featured" : ""}`}>
    <div className="project-card__head">
      <h3 className="project-card__title">{title}</h3>
      {typeof stars === "number" && stars > 0 && (
        <span className="project-card__stars mono">
          <StarIcon width={13} height={13} /> {stars}
        </span>
      )}
    </div>
    <p className="project-card__desc">{description || "No description provided yet."}</p>
    {tags.length > 0 && (
      <div className="project-card__tags">
        {tags.slice(0, 4).map((t) => (
          <span className="project-card__tag" key={t}>{t}</span>
        ))}
      </div>
    )}
    <div className="project-card__links">
      {repoUrl && (
        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="project-card__link">
          <GitHubIcon width={16} height={16} /> Code
        </a>
      )}
      {liveUrl && (
        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="project-card__link">
          <ArrowUpRightIcon width={16} height={16} /> Live
        </a>
      )}
    </div>
  </article>
);

export default ProjectCard;
