import React from 'react';
import './Sidebar.css'; // Import the CSS for styling
import { FaTh, FaPlus, FaList } from 'react-icons/fa';  // Import icons from react-icons

const Sidebar = ({ setCurrentSection, isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="sidebar-toggle-btn">
          ☰
        </button>
      </div>
      <ul className="sidebar-links">
        <li onClick={() => setCurrentSection('products')}>
          <FaTh /> View Products
        </li>
        <li onClick={() => setCurrentSection('addProduct')}>
          <FaPlus /> Add Product
        </li>
        <li onClick={() => setCurrentSection('inventory')}>
          <FaList /> Inventory
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
