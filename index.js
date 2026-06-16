const express = require('express');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT;

// require connection
let connection = require('./config/db');

// require middlewares
let limiter = require('./middleware/rate_limit');

// require routes
const app = express();
let products_router = require('./routes/product_route');
let auth_router = require('./routes/auth_route');

// middlewares
app.use(cors());
app.use(express.json());
app.use(limiter)
app.use('/products', products_router);
app.use('/', auth_router);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connection();
});