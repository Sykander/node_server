const User = require('../Models/User');
const RestfulController = require('./Abstract/RestfulController');

class UserController extends RestfulController
{    
    /** PROTECTED
     * Get the Controller Route
     */
    __getRoute() {
        return '/users';
    }
    
    /** PUBLIC
     * List all Users
     */
    listAction(req, res) {
        User.find((err, users) => {
            if (err) {
                res.status(400).send(err);
            }
            
            res.status(200).json(users);
        });
    }
    
    /** PUBLIC
     * Create new User
     */
    createAction(req, res) {
        const user = new User();
        user.firstName = req.body.firstName || '';
        user.lastName = req.body.lastName || '';
        user.age = req.body.age || 0;
        
        user.save(error => {
            if (error) {
                res.status(400).send(error);
            }
            
            res.status(200).json({message: 'User Created.'});
        });
    }
    
    /** PUBLIC
     * Get a User
     */
    detailAction(req, res) {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                console.error(err);
            }
            
            res.status(200).json(user);
        })
    }
    
    /** PUBLIC
     * Update a User
     */
    updateAction(req, res) {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.status(400).send(err);
            }
            
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.age = req.body.age !== undefined ? req.body.age : user.age;
            
            user.save(err => {
                if (err) {
                    res.status(400).send(err);
                }
                
                res.status(200).json({message: 'User updated.'});
            });
        });
    }
    
    /** PUBLIC
     * Delete a User
     */
    deleteAction(req, res) {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.status(400).send(err);
            }
            
            user.delete(err => {
                if (err) {
                    res.status(400).send(err);
                }
                
                res.status(200).json({message: 'User deleted.'});
            });
        });
    }
}

module.exports = UserController;