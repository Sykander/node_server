const User = require('../../Models/User');

const data = [
    {
        firstName: 'Sykander',
        lastName: 'Gul',
        age: 22
    },
    {
        firstName: 'Alexander',
        lastName: 'Metzgen',
        age: 24
    },
    {
        firstName: 'Adam',
        lastName: 'Abubakari',
        age: 22
    }
];

module.exports = () => {
    User.create(data);
};