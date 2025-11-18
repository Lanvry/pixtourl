import React from 'react';
import '../css/Footer.css'; // Kita akan buat file CSS terpisah
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo">PIXTOURL</h3>
            <p className="footer-description">
              Creating URL Link From Your Picture
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <FontAwesomeIcon icon={faTiktok} style={{color: 'white', width: '20px', height: '20px'}}></FontAwesomeIcon>
              </a>
              <a href="#" className="social-link">
                <FontAwesomeIcon icon={faTwitter} style={{color: 'white', width: '20px', height: '20px'}}></FontAwesomeIcon>
              </a>
              <a href="#" className="social-link">
                <FontAwesomeIcon icon={faInstagram} style={{color: 'white', width: '20px', height: '20px'}}></FontAwesomeIcon>
              </a>
              <a href="#" className="social-link">
                <FontAwesomeIcon icon={faLinkedin} style={{color: 'white', width: '20px', height: '20px'}}></FontAwesomeIcon>
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="footer-links-grid">
            <div className="footer-links-section">
              <h4 className="footer-section-title">Company</h4>
              <ul className="footer-links">
                <li><a href="#about" className="footer-link">About</a></li>
                <li><a href="#usages" className="footer-link">How To Use</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
              </ul>
            </div>

            <div className="footer-links-section">
              <h4 className="footer-section-title">Legal</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                <li><a href="#" className="footer-link">Terms of Service</a></li>
                <li><a href="#" className="footer-link">Cookie Policy</a></li>
                <li><a href="#" className="footer-link">Security</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2024 YourCompany. All rights reserved.
            </p>
            <div className="footer-legal-links">
              <a href="#" className="footer-legal-link">Privacy</a>
              <a href="#" className="footer-legal-link">Terms</a>
              <a href="#" className="footer-legal-link">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;