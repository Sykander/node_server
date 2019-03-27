const Car = require('../../Models/Car');

const data = [
    {
        brand: 'Jaguar',
        registration: 'N1',
        nameplate: 'E-PACE'
    },
    {
        brand: 'LandRover',
        registration: '12345',
        nameplate: 'Discovery Sport'
    },
    {
        brand: 'Ford',
        registration: 'A2B5',
        nameplate: 'Fordster'
    }
];

module.exports = () => {
    Car.create(data);
};