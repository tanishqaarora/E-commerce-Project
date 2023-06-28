const express = require('express');
const router = express.Router();
const { searchProducts, searchProductsByQuery } = require('../../controllers/customer/search');

// Search all products by category id
router.get('/search/products/:categoryId', searchProducts);

// Search by query 
// like query=name or query=description
router.get('/search/products', searchProductsByQuery);


module.exports = router;