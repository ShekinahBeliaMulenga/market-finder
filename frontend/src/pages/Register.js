import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'TRADER',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registration successful!');
      console.log(res.data);
    } catch (err) {
      alert('Error: ' + err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="TRADER">Trader</option>
          <option value="CONSUMER">Consumer</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
