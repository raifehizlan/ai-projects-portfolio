import React from "react";
import "./About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

function About() {
  return (
    <div className="about" id="about">
      <h1>About</h1>
      <p className="ptop">
        I’m a passionate AI Engineer with a strong foundation in Machine
        Learning and Natural Language Processing. My main focus is building
        end-to-end solutions that help machines understand and interact with
        human language.{" "}
      </p>
      <p>
        Over time, I’ve expanded my expertise into DevOps and Cloud
        technologies, allowing me to not only develop intelligent systems but
        also deploy and manage them efficiently in production. I enjoy working
        with CI/CD pipelines, containerization (Docker), orchestration, and
        tools like Azure and AWS.
      </p>
      <p className="pbottom">
        I love creating real-world applications fromS scratch — from data and
        models to backend APIs, frontend interfaces, and scalable
        infrastructure.
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
