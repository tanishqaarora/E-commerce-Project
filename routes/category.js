const express = require('express');
const router = express.Router();
const { addCategory, updateCategory, deleteCategory } = require('../controllers/category');


// Add category
router.post('/add-category', addCategory);

// Update category
router.put('/update/:id', updateCategory);

// Delete category
router.delete('/delete/:id', deleteCategory);

module.exports = router;