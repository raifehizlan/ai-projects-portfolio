import React from 'react';
import './Research.css';
import researchProjects from "../data/researchProjects";
import { Link } from "react-router-dom"; // Link eklemeyi unutma

function Research() {
  return (
    <div className="research" id="research">
      <h1>Research</h1>
      <p className="research-intro">
        An overview of my research work and projects:
      </p>
      <div className="research-list">
        {researchProjects.map((project) => (
          <div className="research-item" key={project.id}>
            <h3>{project.title}</h3>
            <div className="research-description">{project.description}</div>
            <Link to={`/research/${project.id}`} className="research-link">
              📄 View Article
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Research;