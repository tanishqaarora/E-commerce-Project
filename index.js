require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (res, req) => {
    res.send("Hello world");
});

app.listen(port, () => console.log("Server is running on port: ", port));