const express = require('express');
const reqCon = require('require-context');

/**
 * Adds Controllers to a new router
 */
class Router
{
    constructor() {
        this.router = express.Router();
    }
  
    /**
     * Gets all Controllers and adds them to the Router
     */
    useControllers() {
        this.__getControllers();
        this.__addControllers();
    }
    
    /**
     * Gets all Controllers
     */
    __getControllers() {
        this.controllers = reqCon('../../Controllers', false, /\.js$/);
    }
    
    /**
     * Adds the Controllers to the Router
     */
    __addControllers() {
        if (!this.controllers) {
            console.error('Cannot add Controllers before getting Controllers.');
            return;
        }
        
        this.controllers.keys().forEach(controllerName => {
            this.__addController(controllerName);
        });
    }
    
    /**
     * Add the controller to the Router
     */
    __addController(controllerName) {
        const Controller = this.controllers(controllerName);
        const controller = new Controller();
        this.router.use('/', controller.router);
    }
}

module.exports = Router;