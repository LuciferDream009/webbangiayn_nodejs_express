const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authMiddleware } = require('../middleware/authMiddleware');
router.post('/sign-up', UserController.createUser);
router.post('/sign-in', UserController.loginUser);
router.put('/update-user/:id', UserController.updateUser);
router.delete('/delete-user/:id',authMiddleware, UserController.deleteUSer);// admin moi co quyen xoa
router.get('/getAll',authMiddleware,UserController.getAllUser);// admin moi co quyen getall
router.get('/get-details/:id', UserController.getDetailUser);










module.exports = router 