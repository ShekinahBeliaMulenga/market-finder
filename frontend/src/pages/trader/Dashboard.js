import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Add styles for the dashboard layout
import { FaProductHunt, FaPlusCircle, FaBoxOpen } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton'; // Import the skeleton loader
import { Spinner } from 'react-bootstrap'; // Importing a spinner for loading effect

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview'); // Track which section to display
  const [loading, setLoading] = useState(true); // Track loading state
  const [data, setData] = useState(null); // Data to display

  // Simulate data fetching with a timeout
  useEffect(() => {
    setTimeout(() => {
      setData({
        totalProducts: 100,
        totalSales: 250,
      });
      setLoading(false);
    }, 2000); // Simulating a 2-second loading delay
  }, []);

  const renderContent = () => {
    if (loading) {
      // Display loading skeletons while data is being fetched
      return (
        <div className="dashboard-overview">
          <div className="overview-card">
            <Skeleton height={40} />
          </div>
          <div className="overview-card">
            <Skeleton height={40} />
          </div>
        </div>
      );
    }

    // Content to render after data is loaded
    switch (activeSection) {
      case 'overview':
        return (
          <div className="dashboard-overview">
            <div className="overview-card">
              <h2>Total Products</h2>
              <p>{data.totalProducts}</p>
            </div>
            <div className="overview-card">
              <h2>Total Sales</h2>
              <p>{data.totalSales}</p>
            </div>
          </div>
        );
      case 'products':
        return <div>Products Section</div>;
      case 'addProduct':
        return <div>Add Product Section</div>;
      case 'inventory':
        return <div>Inventory Section</div>;
      default:
        return <div>Select an option to view details</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>

      {/* Loading effect while data is being fetched */}
      {loading ? (
        <div className="loading-container">
          <Spinner animation="border" variant="primary" />
          <p>Loading...</p>
        </div>
      ) : (
        renderContent()
      )}

      {/* Bottom Navigation */}
      <div className="dashboard-bottom-nav">
        <div className="nav-item" onClick={() => setActiveSection('overview')}>
          <Link to="#" className="dashboard-link">
            <FaProductHunt size={30} />
            <p>View Overview</p>
          </Link>
        </div>
        <div className="nav-item" onClick={() => setActiveSection('products')}>
          <Link to="#" className="dashboard-link">
            <FaProductHunt size={30} />
            <p>View Products</p>
          </Link>
        </div>
        <div className="nav-item" onClick={() => setActiveSection('addProduct')}>
          <Link to="#" className="dashboard-link">
            <FaPlusCircle size={30} />
            <p>Add Product</p>
          </Link>
        </div>
        <div className="nav-item" onClick={() => setActiveSection('inventory')}>
          <Link to="#" className="dashboard-link">
            <FaBoxOpen size={30} />
            <p>Manage Inventory</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
