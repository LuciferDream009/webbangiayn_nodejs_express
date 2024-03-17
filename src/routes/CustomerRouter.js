const express = require('express');
const router = express.Router();
const customerController = require('../controllers/CustomerController');
router.post('/', customerController.createCustomer);

module.exports = router 