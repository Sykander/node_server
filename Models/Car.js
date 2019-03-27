const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    brand: String,
    registration: String,
    nameplate: String
});

module.exports = mongoose.model('Car', CarSchema);