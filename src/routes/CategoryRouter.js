 const express = require('express');
 const router = express.Router();
 const CategoryController = require('../controllers/CategoryController')
 const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

 router.post('/create-category', CategoryController.createCategory);
 router.put('/update-category/:id', authMiddleware, CategoryController.updateCategory);
 router.delete('/delete-category/:id', CategoryController.deleteCategory);


 module.exports = router    