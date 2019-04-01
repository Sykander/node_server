const Controller = require('./Controller');

/**
 * This class serves as a skeleton for how a restful Controller should work
 */
class RestfulController extends Controller 
{
    /** PROTECTED
     * Initialise Routes
     */
    __initRoutes() {
        this.router.route(this.route)
            .get(this.listAction)
            .post(this.createAction);
        this.router.route(`${this.route}/:id`)
            .get(this.detailAction)
            .put(this.updateAction)
            .delete(this.deleteAction);
    }
    
    /** PUBLIC
     * List all Items
     */
    listAction() {}
    
    /** PUBLIC
     * Create new Item
     */
    createAction() {}
    
    /** PUBLIC
     * Get a Item
     */
    detailAction() {}
    
    /** PUBLIC
     * Delete a Item
     */
    deleteAction() {}
    
    /** PUBLIC
     * Update a Item
     */
    updateAction() {}  
}

module.exports = RestfulController;