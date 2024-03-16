const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/fashiondb',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect succsessfully');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = {connect};

