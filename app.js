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
    
    /** PUBLIC
     * Run the App
     */
    run() {
        this.__getDb();
        this.__getRoutes();
        this.__getCaching();
        this.__addRoutes();
        this.__listenOnPort();
    }
    
    /** PUBLIC
     * Report on the current status
     */
    report() {
        if (!this.listener) {
            console.log('App isn\'t listening on any port.');
            return;
        }

        console.log(`App is listening on ${this.listener.address().port}.`);
    }
    
    /** PROTECTED
     * Get Database connection and seed
     */
    __getDb() {
        this.db = new Database();
        this.db.connect();
        this.db.seed();
    }
    
    /** PROTECTED
     * Get the caching middleware
     */
    __getCaching() {
        this.caching = cacheMiddleware;
    }
    
    /** PROTECTED
     * Get Routes 
     */
    __getRoutes() {
        this.router = new Router();
        this.router.useControllers();
    }
    
    /** PROTECTED
     * Add Routes to App with Middleware
     */
    __addRoutes() {
        this.app.use('/api', this.caching(process.env.CACHE_TIMEOUT), this.router.router);
    }
    
    /** PROTECTED
     * Get App to listen on PORT
     */
    __listenOnPort() {
        if (!process.env.PORT) {
            console.error('No Port specified to listen on.');
            return;
        }
      
        this.listener = this.app.listen(process.env.PORT);
    }
}

module.exports = App;