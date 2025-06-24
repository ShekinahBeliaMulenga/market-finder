const express = require('express');
const { createConsumerProfile } = require('../controllers/consumerController');
const router = express.Router();

router.post('/profile', createConsumerProfile);

module.exports = router;
