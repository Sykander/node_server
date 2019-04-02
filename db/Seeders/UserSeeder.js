const User = require('../../Models/User');

const data = [
    {
        username: 'Sykander',
        email: 'Sykander.Gul@rockar.com',
        password: 'abcd1234'
    }
];

module.exports = () => {
    User.create(data);
};