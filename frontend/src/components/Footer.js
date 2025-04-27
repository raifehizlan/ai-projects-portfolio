import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="mailto:your.email@example.com">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          {/* İsteğe bağlı olarak diğer sosyal medya ikonları ekleyebilirsiniz */}
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Raife Hizlan. All Rights Reserved.
        </p>
        {/* İsteğe bağlı olarak ek navigasyon linkleri veya bilgiler ekleyebilirsiniz */}
      </div>
    </footer>
  );
}

export default Footer;