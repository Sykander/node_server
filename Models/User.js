const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number
});

module.exports = mongoose.model('User', UserSchema);