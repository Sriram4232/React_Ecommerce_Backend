const mongoose = require('mongoose');
require('dotenv').config();
let connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_KEY + '/ecommerce')
        console.log('Database connected')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connection