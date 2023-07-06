const express = require('express');
const router = express.Router();
const {  searchProductsByFilters } = require('../../controllers/customer/search');

// Search all products by category
// router.get('/search/products/:categoryId', searchProducts);


// Search by specific attributes
router.get('/search/products', searchProductsByFilters);


module.exports = router;