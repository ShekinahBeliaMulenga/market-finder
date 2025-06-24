// backend/routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// POST route for registering a new user
router.post('/register', register);

// POST route for logging in an existing user
router.post('/login', login);

module.exports = router;
