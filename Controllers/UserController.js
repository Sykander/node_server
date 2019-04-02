const User = require('../Models/User');
const Controller = require('./Abstract/Controller');

class UserController extends Controller
{
    __getRoute() {
        return '/user';
    }
    
    __initRoutes() {
        this.router.route(this.route)
            .post(this.signInAction);
    }
    
    signInAction(req, res) {
        
    }
    
    createAction(req, res) {
        if (!req.body.username || !req.body.password || !req.body.email) {
            console.error('Invalid params for new User.')
        }
        
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        
        User.create(data, (err, user) => {
            if (err) {
                console.error(err);
                return res.status(400).send(err);
            }
            
            res.status(200).json({message: 'User Created.'});
        });
    }
}

module.exports = UserController;