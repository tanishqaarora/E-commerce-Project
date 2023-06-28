const express = require('express');
const router = express.Router();
const { addProduct, getProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/product');
const verifyToken = require('../utils/authVerify');
const { authorizeSeller } = require('../utils/verifyUser');

// Add product
router.post('/add-product', verifyToken, authorizeSeller, addProduct);

// Get product
router.get('/product/:id', getProduct);

// Get all products
router.get('/all-products', getAllProducts);

// Update product
router.put('/product/:id', verifyToken, authorizeSeller, updateProduct);

// Delete roduct
router.delete('/product/:id', verifyToken, authorizeSeller, deleteProduct);

module.exports = router;