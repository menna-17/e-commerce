import React from 'react';
import './Footer.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer custom-footer py-3">
      <div className="container text-center">
        <p>© 2025 Local Market. All rights reserved.</p>
        <div className="contact-icons">
          <FaEnvelope />
          <FaPhone />
          <FaMapMarkerAlt />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
