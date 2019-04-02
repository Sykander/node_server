const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../Models/User');

const config = {
    usernameField: 'user[email]',
    passwordField: 'user[password]'
};

const localStrategy = new LocalStrategy(config, (email, password, done) => {
    User.findOne({ email })
        .then(user => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, {message: 'Invalid email password combination.'});
            }
            
            return done(null, user);
        }
    ).catch(done);
});

passport.use(localStrategy);