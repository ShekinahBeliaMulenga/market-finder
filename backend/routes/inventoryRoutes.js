const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/', inventoryController.addInventory);
router.get('/:traderId', inventoryController.getTraderInventory);

module.exports = router;

