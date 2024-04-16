const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String },
        rating: { type: Number, required: true, default: 0 },
        category: { type: String, required: true },
        price: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
        discount: { type: Number},
        selled: { type: Number}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema)