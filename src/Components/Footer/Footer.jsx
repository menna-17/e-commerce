import React from 'react';
import styles from './Footer.module.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={`${styles['custom-footer']} footer py-3`}>
      <div className="container text-center">
        <p>© 2025 Local Market. All rights reserved.</p>

        <div className={styles['contact-row']}>
          <span className={styles['contact-label']}>Contact Us</span>
          <div className={styles['contact-icons']}>
            <FaEnvelope />
            <FaPhone />
            <FaMapMarkerAlt />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
