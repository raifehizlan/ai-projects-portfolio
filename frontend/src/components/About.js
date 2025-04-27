import React from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

function About() {
  return (
    <div className="about" id="about">
      <h1>About</h1>
      <p>
        I am a passionate Artificial Intelligence (AI) Engineer dedicated to
        solving complex challenges using modern technologies. With a strong
        background in Machine Learning and Artificial Intelligence, I specialize
        in developing innovative solutions that enable computers to understand
        and interact with human language. Furthermore, I am an expert in
        designing and building effective Continuous Integration and Delivery
        (CI/CD) pipelines, containerization, orchestration, monitoring,
        infrastructure automation tools, configuration management tools, as well
        as AWS/Azure solutions.
      </p>
      <div className="aboutExp">
        <div className="aboutExpYears">
          <h1>04+</h1> {/* Gerçek deneyim sürenize göre güncelleyin */}
          <p>Years XP</p>
        </div>
        <div className="aboutExpProjects">
          <h1>20+</h1> {/* Gerçek proje sayınıza göre güncelleyin */}
          <p>Projects</p>
        </div>
        <div className="aboutCompanies">
          <h1>03</h1> {/* Çalıştığınız şirket sayısına göre güncelleyin */}
          <p>Companies</p>
        </div>
      </div>
      <div className="aboutMessage">
        <a href="#contact">
          Leave a message <FontAwesomeIcon icon={faMessage} />
        </a>
      </div>
    </div>
  );
}

export default About;