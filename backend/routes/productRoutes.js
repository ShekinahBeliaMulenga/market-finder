const express = require('express');
const { addCategory, addProduct, getCategories } = require('../controllers/productController');

const router = express.Router();

router.post('/category', addCategory);        // /api/product/category
router.post('/', addProduct);                 // /api/product
router.get('/category', getCategories);       // /api/product/category

module.exports = router;
