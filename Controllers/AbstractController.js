const express = require('express');

class AbstractController
{
    constructor() {
        this.router = this.__getRouter();
        this.route = this.getRoute();
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
    getRoute() {
        return '/';
    }
    
    /**
     * Initialise Routes
     */
    __initRoutes() {}
}

module.exports = AbstractController;