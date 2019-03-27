const Car = require('../Models/Car');
const AbstractController = require('./AbstractController');

class CarController extends AbstractController
{    
    __initRoutes() {
        this.router.route(this.route)
            .get(this.listAction)
            .post(this.createAction);
        this.router.route(`${this.route}/:id`)
            .get(this.getCarAction)
            .put(this.updateCarAction)
            .delete(this.deleteCarAction);
    }
    
    getRoute() {
        return '/car';
    }
    
    /**
     * List all Cars
     */
    listAction(req, res) {
        Car.find((err, cars) => {
            if (err) {
                res.send(err);
            }
            
            res.json(cars);
        });
    }
    
    /**
     * Create new Car
     */
    createAction(req, res) {
        const car = new Car();
        
        car.brand = req.body.brand || '';
        car.registration = req.body.registration || '';
        car.nameplate = req.body.nameplate || '';
        
        car.save(error => {
            if (error) {
                res.send(error);
            }
            
            res.json({message: 'Car Created.'});
        });
    }
    
    /**
     * Get a Car
     */
    getCarAction(req, res) {
        Car.findById(req.params.id, (err, car) => {
            if (err) {
                console.error(err);
            }
            
            res.json(car);
        })
    }
    
    /**
     * Update a Car
     */
    updateCarAction(req, res) {
        Car.findById(req.params.id, (err, car) => {
            if (err) {
                res.send(err);
            }
            
            car.brand = req.body.brand || car.brand;
            car.registration = req.body.registration || car.registration;
            car.nameplate = req.body.nameplate || car.nameplate;
            
            car.save(err => {
                if (err) {
                    res.send(err);
                }
                
                res.json({message: 'Car updated.'});
            });
        });
    }
    
    /**
     * Delete a Car
     */
    deleteCarAction(req, res) {
        Car.findById(req.params.id, (err, car) => {
            if (err) {
                res.send(err);
            }
            
            car.delete(err => {
                if (err) {
                    res.send(err);
                }
                
                res.json({message: 'Car deleted.'});
            });
        });
    }
}

module.exports = CarController;