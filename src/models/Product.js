const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name : { type: String, required: true, unique: true },
    title : {type : String, required: true},
    desciption: { type :String, required: true},
    price :{ type: float, required: true},
    image : {type: String, required: true}
})

module.exports = mongoose.Model('Product',productSchema)