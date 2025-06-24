import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Dashboard.css';
import { FaBoxes, FaPlusCircle, FaWarehouse, FaChartBar } from 'react-icons/fa';

const navItems = [
  { to: '/trader/dashboard',               label: 'Overview',  icon: <FaChartBar size={20} /> },
  { to: '/trader/dashboard/products',      label: 'Products',  icon: <FaBoxes size={20} /> },
  { to: '/trader/dashboard/add-product',   label: 'Add',       icon: <FaPlusCircle size={20} /> },
  { to: '/trader/dashboard/inventory',     label: 'Inventory', icon: <FaWarehouse size={20} /> },
];


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Trader Dashboard</h1>
      <div className="content-container">
        <Outlet />
      </div>
      <nav className="dashboard-bottom-nav">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            to={to}
            key={label}
            end
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="icon">{icon}</span>
            <span className="label">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Dashboard;