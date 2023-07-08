const express = require('express');
const router = express.Router();
const { addProductToCart, productsInCart, deleteProductFromCart } = require('../../controllers/customer/cart');

// Add product to cart
router.post('/cart/addProduct', addProductToCart);

// Get products from cart
router.get('/cart/products', productsInCart);

// Remove product to cart
router.delete('/cart/deleteProduct', deleteProductFromCart);

module.exports = router;