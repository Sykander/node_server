const express = require('express');

/**
 * This class serves as a skeleton for how controller should work
 */
class Controller
{
    /** PROTECTED
     * Constructor
     */
    constructor() {
        this.router = this.__getRouter();
        this.route = this.__getRoute();
        this.__initRoutes();
    }
    
    /** PRIVATE
     * Get a new Router Object
     */
    __getRouter() {
        return new express.Router();
    }
    
    /** PROTECTED
     * Get the Controller Route
     */
    __getRoute() {
        return '/';
    }
    
    /** PROTECTED
     * Initialise Routes
     */
    __initRoutes() {}
}

module.exports = Controller;