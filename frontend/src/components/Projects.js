import React from 'react';
import './Projects.css';
import projectsData from '../data/projectsData';

function Projects() {
  return (
    <div className="projects" id="projects">
      <h1>Projects</h1>
      <p className="projects-intro">Check out some of my featured projects:</p>
      <div className="projects-grid">
        {projectsData.map((project) => (
          <div className="project-card" key={project.id}>
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-info">
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index}>{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
                {project.liveDemoLink && (
                  <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;