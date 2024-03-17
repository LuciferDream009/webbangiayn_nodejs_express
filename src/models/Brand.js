const mongoose = require('mongoose');
const brand = new mongoose.Schema({
    name: { type : String, required: true},
    description : { type : String, required : true},
    website : { type : String, required: true},
});

module.exports = mongoose.model('Brand', brand);