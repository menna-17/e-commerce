// src/Components/HeroSection/HeroSection.jsx
import React from 'react';
import './HeroSection.css'; // Optional: your custom styles
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-container">
      {/* Bootstrap Carousel with auto-slide */}
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="h1.jpg" className="d-block w-100" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img src="h2.jpg" className="d-block w-100" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img src="h3.jpg" className="d-block w-100" alt="Third slide" />
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

     
    </div>
  );
};

export default HeroSection;
