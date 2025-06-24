import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to Market Finder</h1>
        <p className="home-description">
          The app that helps you easily find the products you're looking for in nearby stores.
        </p>
      </header>

      <div className="home-actions">
        <p className="cta-text">Ready to start? Register or log in to get started:</p>
        <div className="action-buttons">
          <Link to="/register" className="btn primary-btn">Register</Link>
          <Link to="/login" className="btn secondary-btn">Login</Link>
        </div>
      </div>

      <footer className="home-footer">
        <p>&copy; 2025 Market Finder. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
