require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// DB init
const Database = require('./db');
const db = new Database();
db.connect();
db.seed();

// App init
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Get Routes
const Router = require('./Router');
const router = new Router();
router.useControllers();

// Add Routes
app.use('/api', router.router);
app.listen(process.env.PORT || 8080);
