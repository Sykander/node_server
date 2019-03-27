const express = require('express');

/**
 * This class serves as a skeleton for how controller should work
 */
class AbstractController
{
    constructor() {
        this.router = this.__getRouter();
        this.route = this.__getRoute();
        this.__initRoutes();
    }
    
    /**
     * Get a new Router Object
     */
    __getRouter() {
        return new express.Router();
    }
    
    /**
     * Get the Controller Route
     */
    __getRoute() {
        return '/';
    }
    
    /**
     * Initialise Routes
     */
    __initRoutes() {}
}

module.exports = AbstractController;