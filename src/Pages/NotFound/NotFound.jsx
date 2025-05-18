import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div className="not-found-container d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <h1 className="display-4">404 - Page Not Found</h1>
      <p className="lead">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
