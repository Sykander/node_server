const express = require('express');
const reqCon = require('require-context');

/**
 * Adds Controllers to a new router
 */
class Router
{
    constructor() {
        this.router = this.__getRouter();
    }
    
    /** PRIVATE
     * Get a new Router Object
     */
    __getRouter() {
        return new express.Router();
    }
  
    /** PUBLIC
     * Gets all Controllers and adds them to the Router
     */
    useControllers() {
        this.__getControllers();
        this.__addControllers();
    }
    
    /** PROTECTED
     * Gets all Controllers
     */
    __getControllers() {
        this.controllers = reqCon('../../Controllers', false, /\.js$/);
    }
    
    /** PROTECTED
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
    
    /** PROTECTED
     * Add the controller to the Router
     */
    __addController(controllerName) {
        const Controller = this.controllers(controllerName);
        const controller = new Controller();
        this.router.use('/', controller.router);
    }
}

module.exports = Router;