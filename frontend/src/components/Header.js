import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faAddressCard,
  faBriefcase,
  faLightbulb,
  faBookOpen,
  faScrewdriverWrench,
  faGlobe,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    setMenuOpen(false); // Menü kapansın
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <header>
      <div className="header">
        {/* Hamburger ikon */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </div>

        {/* Menü */}
        <ul className={menuOpen ? "nav open" : "nav"}>
          <li>
            <a onClick={() => scrollToSection("home")}>
              <FontAwesomeIcon icon={faHouseUser} /> Home
            </a>
          </li>
          <li>
            <a onClick={() => scrollToSection("about")}>
              <FontAwesomeIcon icon={faAddressCard} /> About
            </a>
          </li>
          <li>
            <a onClick={() => scrollToSection("experience")}>
              <FontAwesomeIcon icon={faBriefcase} /> Experience
            </a>
          </li>
          <li>
            <a onClick={() => scrollToSection("projects")}>
              <FontAwesomeIcon icon={faLightbulb} /> Projects
            </a>
          </li>
          <li>
            <a onClick={() => scrollToSection("research")}>
              <FontAwesomeIcon icon={faBookOpen} /> Research
            </a>
          </li>
          <li>
            <a onClick={() => scrollToSection("skills")}>
              <FontAwesomeIcon icon={faScrewdriverWrench} /> Skills
            </a>
          </li>
          <li>
            <a onClick={() => scrollToSection("contact")}>
              <FontAwesomeIcon icon={faGlobe} /> Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
