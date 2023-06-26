const express = require('express');
const router = express.Router();
const { searchProducts, getProduct, searchProductsByQuery } = require('../controllers/search');

// Search all products by category id
router.get('/search/products/:categoryId', searchProducts);

// Get product details by product id
router.get('/search/product/:id', getProduct);

// Search by query 
// like query=name or query=description
router.get('/search/products', searchProductsByQuery);


module.exports = router;