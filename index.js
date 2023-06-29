require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const app = express();
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/admin/category');
const searchRoutes = require('./routes/customer/search');
const productRoutes = require('./routes/seller/product');
const productFeaturesRoutes = require('./routes/seller/productFeatures');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Adding Routes
app.use('/', userRoutes);
app.use('/category', categoryRoutes);
app.use('/', searchRoutes);
app.use('/', productRoutes);
app.use('/', productFeaturesRoutes);

app.listen(port, () => console.log("Server is running on port: ", port));