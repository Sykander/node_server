const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    hash: String,
    salt: String
});

const hashing = (password, salt) => crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

UserSchema.methods.setPassword = password => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = hashing(password, this.salt);
};

UserSchema.methods.validatePassword = password => {
    return this.hash = hashing(password, this.salt);
};

UserSchema.methods.generateJWT = () => {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, process.env.SESSION_SECRET);
};

UserSchema.methods.toAuthJSON = () => {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT()
    };
};

module.exports = mongoose.model('User', UserSchema);