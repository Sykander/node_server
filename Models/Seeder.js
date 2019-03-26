const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeederSchema = new Schema({
    name: String,
    hasRun: Boolean,
    runAt: Date
});

module.exports = mongoose.model('Seeder', SeederSchema);