require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// DB init
const db = require('./db');

// App init
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Get Routes
const Route = require('./Routes');
const router = express.Router();
new Route(router);
app.use('/api', router);
app.listen(process.env.PORT || 8080);