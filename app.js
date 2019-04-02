const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

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
        this.__getViews();
        this.__getSession();
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
     * Get Views and configure
     */
    __getViews() {
        this.app.engine('html', mustacheExpress());
        this.app.set('view engine', 'html');
        this.app.set('views', __dirname + '/views');
        this.app.use(express.static(__dirname + '/public'));
    }
    
    /** PROTECTED
     * Get the Session
     */
    __getSession() {
        this.session = session({
            name: 'session_id',
            secret: process.env.SESSION_SECRET || 'secret-1234',
            cookie: {
                maxAge: 60000,
                httpOnly: false,
                domain: '127.0.0.1:8080'
            },
            resave: false,
            saveUninitialized: false 
        });
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
        this.app.use(this.caching(process.env.CACHE_TIMEOUT), this.session, this.router.router);
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