const User = require('../../Models/User');

const addUserRoutes = routes => {
    routes.route('/users')
        .post((req, res) => {
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
        })
        .get((req, res) => {
            User.find((err, users) => {
                if (err) {
                    res.send(err);
                }
                
                res.json(users);
            });
        });
        
    routes.route('/users/:user_id')
        .get((req, res) => {
            User.findById(req.params.user_id, (err, user) => {
                if (err) {
                    res.send(err);
                }
                
                res.json(user);
            });
        })
        .put((req, res) => {
            User.findById(req.params.user_id, (err, user) => {
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
        })
        .delete((req, res) => {
            User.findById(req.params.user_id, (err, user) => {
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
        });
};

module.exports = addUserRoutes;