const express = require('express');
const router = express.Router();
const { addCategory, updateCategory, deleteCategory } = require('../../controllers/admin/category');
const verifyToken = require('../../utils/authVerify');
const { authorizeAdmin } = require('../../utils/verifyUser');


// Add category
router.post('/add-category', verifyToken, authorizeAdmin, addCategory);

// Update category
router.put('/update/:id', verifyToken, authorizeAdmin, updateCategory);

// Delete category
router.delete('/delete/:id', verifyToken, authorizeAdmin, deleteCategory);

module.exports = router;