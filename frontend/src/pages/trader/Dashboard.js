import React, { useState, useEffect } from 'react';
import { FaBoxes, FaPlusCircle, FaWarehouse, FaChartPie } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData({
        totalProducts: 120,
        totalSales: 345,
      });
      setLoading(false);
    }, 1500);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <FaChartPie size={28} /> },
    { id: 'products', label: 'Products', icon: <FaBoxes size={28} /> },
    { id: 'addProduct', label: 'Add Product', icon: <FaPlusCircle size={28} /> },
    { id: 'inventory', label: 'Inventory', icon: <FaWarehouse size={28} /> },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="dashboard-overview">
          <Skeleton count={2} height={120} borderRadius={12} />
        </div>
      );
    }

    switch (activeSection) {
      case 'overview':
        return (
          <div className="dashboard-overview">
            <div className="overview-card royal-card">
              <h2>Total Products</h2>
              <p>{data.totalProducts}</p>
            </div>
            <div className="overview-card royal-card">
              <h2>Total Sales</h2>
              <p>{data.totalSales}</p>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="section-placeholder royal-section">
            <h3>Products Section</h3>
          </div>
        );
      case 'addProduct':
        return (
          <div className="section-placeholder royal-section">
            <h3>Add Product Section</h3>
          </div>
        );
      case 'inventory':
        return (
          <div className="section-placeholder royal-section">
            <h3>Inventory Section</h3>
          </div>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="royal-title">Trader Dashboard</h1>

      <div className="content-container">{renderContent()}</div>

      <nav className="dashboard-bottom-nav">
        {navItems.map(({ id, label, icon }) => (
          <button
            key={id}
            className={`nav-item ${activeSection === id ? 'active' : ''}`}
            onClick={() => setActiveSection(id)}
            aria-label={label}
            title={label}
          >
            <span className="icon">{icon}</span>
            <span className="label">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Dashboard;
