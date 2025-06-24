const express = require('express');
const router = express.Router();
const { createOrUpdateTraderProfile } = require('../controllers/traderController');

// Post route for creating or updating a trader profile
router.post('/api/trader/create-profile', createOrUpdateTraderProfile);

module.exports = router;
