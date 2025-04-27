import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faAddressCard, faBriefcase, faLightbulb, faBookOpen, faScrewdriverWrench, faGlobe } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header>
      <div className="header">
        <ul>
          <li>
            <a href="#top">
              <FontAwesomeIcon icon={faHouseUser} /> Home
            </a>
          </li>
          <li>
            <a href="#about">
              <FontAwesomeIcon icon={faAddressCard} /> About
            </a>
          </li>
          <li>
            <a href="#experience">
              <FontAwesomeIcon icon={faBriefcase} /> Experience
            </a>
          </li>
          <li>
            <a href="#projects">
              <FontAwesomeIcon icon={faLightbulb} /> Projects
            </a>
          </li>
          <li>
            <a href="#research">
              <FontAwesomeIcon icon={faBookOpen} /> Research
            </a>
          </li>
          <li>
            <a href="#skills">
              <FontAwesomeIcon icon={faScrewdriverWrench} /> Skills
            </a>
          </li>
          <li>
            <a href="#contact">
              <FontAwesomeIcon icon={faGlobe} /> Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;