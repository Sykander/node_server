const Car = require('../Models/Car');
const RestfulController = require('./Abstract/RestfulController');

class CarController extends RestfulController
{    
    /** PROTECTED
     * Get the Controller Route
     */
    __getRoute() {
        return '/cars';
    }
    
    /** PUBLIC
     * List all Cars
     */
    listAction(req, res) {
        Car.find((err, cars) => {
            if (err) {
                res.status(400).send(err);
            }
            
            res.status(200).json(cars);
        });
    }
    
    /** PUBLIC
     * Create new Car
     */
    createAction(req, res) {
        const car = new Car();
        
        car.brand = req.body.brand || '';
        car.registration = req.body.registration || '';
        car.nameplate = req.body.nameplate || '';
        
        car.save(error => {
            if (error) {
                res.status(400).send(error);
            }
            
            res.status(200).json({message: 'Car Created.'});
        });
    }
    
    /** PUBLIC
     * Get a Car
     */
    detailAction(req, res) {
        Car.findById(req.params.id, (err, car) => {
            if (err) {
                console.error(err);
            }
            
            res.status(200).json(car);
        })
    }
    
    /** PUBLIC
     * Update a Car
     */
    updateAction(req, res) {
        Car.findById(req.params.id, (err, car) => {
            if (err) {
                res.status(400).send(err);
            }
            
            car.brand = req.body.brand || car.brand;
            car.registration = req.body.registration || car.registration;
            car.nameplate = req.body.nameplate || car.nameplate;
            
            car.save(err => {
                if (err) {
                    res.status(400).send(err);
                }
                
                res.status(200).json({message: 'Car updated.'});
            });
        });
    }
    
    /** PUBLIC
     * Delete a Car
     */
    deleteAction(req, res) {
        Car.findById(req.params.id, (err, car) => {
            if (err) {
                res.status(400).send(err);
            }
            
            car.delete(err => {
                if (err) {
                    res.status(400).send(err);
                }
                
                res.status(200).json({message: 'Car deleted.'});
            });
        });
    }
}

module.exports = CarController;