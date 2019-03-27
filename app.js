const express = require('express');
const bodyParser = require('body-parser');

const cacheMiddleware = require('./Middleware/Cache');
const Database = require('./db');
const Router = require('./Router');

class App 
{
    constructor() {
        this.app = new express();
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());
    }
    
    /**
     * Run the App
     */
    run() {
        this.getDb();
        this.getRoutes();
        this.getCaching();
        this.addRoutes();
        console.log('App is running.');
    }
    
    /**
     * Get Database connection and seed
     */
    getDb() {
        this.db = new Database();
        this.db.connect();
        this.db.seed();
    }
    
    /**
     * Get the caching middleware
     */
    getCaching() {
        this.caching = cacheMiddleware;
    }
    
    /**
     * Get Routes 
     */
    getRoutes() {
        this.router = new Router();
        this.router.useControllers();
    }
    
    /**
     * Add Routes to App with Middleware
     */
    addRoutes() {
        this.app.use('/api', this.caching(process.env.CACHE_TIMEOUT), this.router.router);
        this.app.listen(process.env.PORT);
    }
}

module.exports = App;