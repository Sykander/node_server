const User = require('../Models/User');
const AbstractController = require('./AbstractController');

class UserController extends AbstractController
{    
    __initRoutes() {
        this.router.route(this.route)
            .get(this.listAction)
            .post(this.createAction);
        this.router.route(`${this.route}/:id`)
            .get(this.detailAction)
            .put(this.updateAction)
            .delete(this.deleteAction);
    }
    
    __getRoute() {
        return '/user';
    }
    
    /**
     * List all Users
     */
    listAction(req, res) {
        User.find((err, users) => {
            if (err) {
                res.send(err);
            }
            
            res.json(users);
        });
    }
    
    /**
     * Create new User
     */
    createAction(req, res) {
        const user = new User();
        user.firstName = req.body.firstName || '';
        user.lastName = req.body.lastName || '';
        user.age = req.body.age || 0;
        
        user.save(error => {
            if (error) {
                res.send(error);
            }
            
            res.json({message: 'User Created.'});
        });
    }
    
    /**
     * Get a User
     */
    detailAction(req, res) {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                console.error(err);
            }
            
            res.json(user);
        })
    }
    
    /**
     * Update a User
     */
    updateAction(req, res) {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.send(err);
            }
            
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.age = req.body.age !== undefined ? req.body.age : user.age;
            
            user.save(err => {
                if (err) {
                    res.send(err);
                }
                
                res.json({message: 'User updated.'});
            });
        });
    }
    
    /**
     * Delete a User
     */
    deleteAction(req, res) {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.send(err);
            }
            
            user.delete(err => {
                if (err) {
                    res.send(err);
                }
                
                res.json({message: 'User deleted.'});
            });
        });
    }
}

module.exports = UserController;