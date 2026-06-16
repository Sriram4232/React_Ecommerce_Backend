const mongoose = require("mongoose");

let user_schema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['buyer', 'seller'], default: 'buyer' }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('users', user_schema);