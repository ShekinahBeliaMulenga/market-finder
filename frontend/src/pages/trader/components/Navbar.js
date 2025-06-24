import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import './Navbar.css';


const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <h2>Market Finder</h2>
      <button onClick={toggleTheme}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;
