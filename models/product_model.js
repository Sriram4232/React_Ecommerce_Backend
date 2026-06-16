const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({
    // id: {}, // -> this is not needed as it will be created by default
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    catagory: { type: String, required: false },
    image: { type: String, required: true },
    rating: {
        rate: { type: Number, required: false },
        count: { type: Number, required: false }
    }
});

module.exports = mongoose.model('products', product_schema);

