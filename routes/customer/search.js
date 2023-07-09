const express = require('express');
const router = express.Router();
const {  searchProductsByCategory, searchProductsByFilters } = require('../../controllers/customer/search');

// Search products by category
router.get('/search/products/:categoryId', searchProductsByCategory);

// Search products by filters
router.get('/search/products', searchProductsByFilters);


module.exports = router;