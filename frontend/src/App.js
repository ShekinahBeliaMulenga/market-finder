import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/trader/Dashboard';
import Products from './pages/trader/Product';
import AddProduct from './pages/trader/AddProduct';
import Inventory from './pages/trader/Inventory';
import Overview from './pages/trader/Overview';
import TraderProfileForm from './pages/trader/components/TraderProfileForm';
import PrivateRoute from './components/PrivateRoute';
import Search from './pages/consumer/Search';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/consumer/search" element={<Search />} />
          <Route path="/trader/profile" element={<PrivateRoute><TraderProfileForm /></PrivateRoute>} />

          <Route path="/trader/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route index element={<Overview />} />
            <Route path="products" element={<Products />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="inventory" element={<Inventory />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;