const Controller = require('./Abstract/Controller');

class HomeController extends Controller
{
    __getRoute() {
        return '/';
    }
    
    __initRoutes() {
        this.router.route(this.route)
            .get(this.homeAction);
    }
    
    homeAction(req, res) {
        res.render('main', {
            
        });
    }
}

module.exports = HomeController;