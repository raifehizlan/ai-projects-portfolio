import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPython,
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faDocker,
//   faKubernetes,
  faAws,
//   faMicrosoftAzure,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCode, // Generic code icon
  faDatabase,
  faServer, // For Node.js
  faRocket, // For FastAPI (can be symbolic)
  faFlask,
  faBrain, // For TensorFlow/PyTorch/NLP
  faCloud, // For S3/Cloud
  faProjectDiagram, // For FAISS
  faCodeBranch, // For Terraform/CI/CD/Ansible/Jenkins
  faTable, // For Pandas/NumPy
  faChartBar, // For Scikit-learn/Tableau
} from '@fortawesome/free-solid-svg-icons';
import './Skills.css';

const languageIcons = {
  Python: faPython,
  SQL: faDatabase,
  HTML: faHtml5,
  CSS: faCss3Alt,
  JavaScript: faJs,
  'Node.js': faServer,
};

const frameworkIcons = {
  FastAPI: faRocket,
  Flask: faFlask,
  React: faReact,
  TensorFlow: faBrain,
  PyTorch: faBrain,
};

const databaseIcons = {
  PostgreSQL: faDatabase,
  S3: faCloud,
  'FAISS (Vector Databases)': faProjectDiagram,
};

const nlpIcons = {
  'Hugging Face Transformers': faBrain,
  SparkNLP: faBrain,
  NLTK: faBrain,
  SpaCy: faBrain,
  LLMs: faBrain,
  'RAG Pipelines': faCodeBranch,
};

const devopsIcons = {
  Docker: faDocker,
  Kubernetes: "",
  Terraform: faCodeBranch,
  'CI/CD': faCodeBranch,
  Ansible: faCodeBranch,
  Jenkins: faCodeBranch,
  AWS: faAws,
  Azure: "",
};

const dataAnalysisIcons = {
  Pandas: faTable,
  NumPy: faTable,
  'Scikit-learn': faChartBar,
  Tableau: faChartBar,
};

function Skills() {
  return (
    <div className="skills-container aesthetic-list-with-icons" id="skills">
      <h2>Technical Skills</h2>

      <div className="skill-category">
        <h3>Programming Languages</h3>
        <ul>
          {Object.entries(languageIcons).map(([lang, icon]) => (
            <li key={lang}>
              <FontAwesomeIcon icon={icon} className="skill-icon" /> {lang}
            </li>
          ))}
        </ul>
      </div>

      <div className="skill-category">
        <h3>Frameworks & Libraries</h3>
        <ul>
          {Object.entries(frameworkIcons).map(([framework, icon]) => (
            <li key={framework}>
              <FontAwesomeIcon icon={icon} className="skill-icon" /> {framework}
            </li>
          ))}
        </ul>
      </div>

      <div className="skill-category">
        <h3>Databases</h3>
        <ul>
          {Object.entries(databaseIcons).map(([db, icon]) => (
            <li key={db}>
              <FontAwesomeIcon icon={icon} className="skill-icon" /> {db}
            </li>
          ))}
        </ul>
      </div>

      <div className="skill-category">
        <h3>Natural Language Processing (NLP) Tools</h3>
        <ul>
          {Object.entries(nlpIcons).map(([tool, icon]) => (
            <li key={tool}>
              <FontAwesomeIcon icon={icon} className="skill-icon" /> {tool}
            </li>
          ))}
        </ul>
      </div>

      <div className="skill-category">
        <h3>DevOps & Cloud Technologies</h3>
        <ul>
          {Object.entries(devopsIcons).map(([tech, icon]) => (
            <li key={tech}>
              <FontAwesomeIcon icon={icon} className="skill-icon" /> {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="skill-category">
        <h3>Data Analysis & Visualization</h3>
        <ul>
          {Object.entries(dataAnalysisIcons).map(([tool, icon]) => (
            <li key={tool}>
              <FontAwesomeIcon icon={icon} className="skill-icon" /> {tool}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Skills;