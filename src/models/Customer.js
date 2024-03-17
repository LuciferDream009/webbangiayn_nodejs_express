const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    gender: String,
  });
  const Customer = mongoose.model('Customer', customerSchema);
  