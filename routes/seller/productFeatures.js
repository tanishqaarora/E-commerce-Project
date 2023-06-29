const express = require('express');
const router = express.Router();
const { addProductFeature } = require('../../controllers/seller/productFeatures');
const verifyToken = require('../../utils/authVerify');
const { authorizeSeller } = require('../../utils/verifyUser');

// Add product extra features
router.post('/add-product-features', verifyToken, authorizeSeller, addProductFeature);

module.exports = router;