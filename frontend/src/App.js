import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/trader/Dashboard';
import Products from './pages/trader/Product';
import AddProduct from './pages/trader/AddProduct';
import Inventory from './pages/trader/Inventory';
import TraderProfileForm from './pages/trader/components/TraderProfileForm'; // Import the trader profile form
import PrivateRoute from './components/PrivateRoute';
import Search from './pages/consumer/Search';  // Import the Search component

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="trader/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/trader/products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/trader/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path="/trader/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} />
          
          {/* New route for Trader Profile Form */}
          <Route path="/trader/profile" element={<PrivateRoute><TraderProfileForm /></PrivateRoute>} />

          {/* New route for the Search page */}
          <Route path="/consumer/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
