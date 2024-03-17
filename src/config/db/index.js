const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/fashiondb');
        console.log('Connect to db successfully');
    } catch (error) {
        handleError(error);
    }

}

module.exports = { connect };