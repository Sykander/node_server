const reqCon = require('require-context');

/**
 * Adds Controllers with Routes to the provided app
 */
class Routes
{
    constructor(app) {
        this.app = app;
        this.__getControllers();
        this.__addControllers();
    }
    
    /**
     * Gets all Controllers
     */
    __getControllers() {
        this.controllers = reqCon('../../Routes/Controllers', false, /\.js$/);
    }
    
    /**
     * Adds the Controllers to the provided app
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
     * Add the controller to the provided app
     */
    __addController(controllerName) {
        const method = this.controllers(controllerName);
        
        if (!method || typeof method !== 'function') {
            console.error('Invalid Controller.');
            return;
        }
        
        method(this.app);
    }
}

module.exports = Routes;