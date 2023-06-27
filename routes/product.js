const express = require('express');
const router = express.Router();
const { addProduct, getProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/product');
const verifyToken = require('../utils/authVerify');

// Add product
router.post('/add-product', verifyToken, addProduct);

// Get product
router.get('/product/:id', getProduct);

// Get all products
router.get('/all-products', getAllProducts);

// Update product
router.put('/product/:id', verifyToken, updateProduct);

// Delete roduct
router.delete('/product/:id', verifyToken, deleteProduct);

module.exports = router;