const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config()
const logger = require('loglevel');
const app = express();
const searchController = require('./controllers/searchController');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/api', (req, res) => {
    logger.warn('Home page visited')
    res.json({ "message": "Homepage info from the server" });
});

// products page
app.post('/api/products', searchController.getProducts);

// search products route
// app.post('/products/', searchController.searchProducts);

app.listen(process.env.PORT, () => {
    console.log(`${process.env.APP_NAME} is listening on port ${process.env.PORT}`);
});