require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const app = express();
const userRoutes = require('./routes/user');
const dashboardRoute = require('./utils/dashboard');
const categoryRoutes = require('./routes/category');
const searchRoutes = require('./routes/search');
const productRoutes = require('./routes/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Adding Routes
app.use('/', userRoutes);
app.use('/', dashboardRoute);
app.use('/category', categoryRoutes);
app.use('/', searchRoutes);
app.use('/', productRoutes);

app.listen(port, () => console.log("Server is running on port: ", port));