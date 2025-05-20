import React from 'react';
import './Home.css';
import ProfileImage from "../assets/profile2.jpg"; // Fotoğrafın doğru yolunu ayarlayın
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";

function Home() {
  return (
    <div id="home">
      <div className="homeText">
        <h1 className='homeh1'>Hi, I'm Raife Hizlan</h1> {/* Adınızı güncelledim */}
        <h3>💻 🧠 ❤️</h3> {/* İlgi alanlarınıza göre güncelleyebilirsiniz */}
        <p>Full Stack AI Engineer | DevOps & Cloud Enthusiast</p>{" "}
        {/* Unvanınızı güncelledim */}
      </div>
      <div className="homeImage">
        <img src={ProfileImage} alt="" />
        <div className="socialMedia">
          <a
            href="https://github.com/raifehizlan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.linkedin.com/in/raife-gulum-hizlan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            {/* LinkedIn profilinizi güncelleyin */}
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://medium.com/@raifehizlan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faMedium} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;