// components/Footer.js
import React from "react";
import "../style/Footer.css" // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Yaman Raj Singh. All Rights Reserved.
        </p>
        <p className="footer-text">
          Follow us on:
          <a href="https://github.com/yamanrajsingh" target="_blank" rel="noopener noreferrer"> Github</a> | 
          <a href="https://www.linkedin.com/in/yamanrajsingh/" target="_blank" rel="noopener noreferrer"> Linkedin</a> | 
          <a href="https://www.instagram.com/yamanrajsingh007" target="_blank" rel="noopener noreferrer"> Instagram  </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
