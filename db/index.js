const mongoose = require('mongoose');
const reqCon = require('require-context');
const SeederManager = require('./SeederManager');

/**
 * This class is for initialising, seeding, connecting etc. to the DB
 */
class Database
{
    constructor() {
        this.uri = this.__constructUri();
        this.db = this.__constructConnection();
        this.__runSeeders();
    }
    
    /**
     * Construct URI to connect to the DB
     */
    __constructUri() {
        let uri = 'mongodb://';
        if (process.env.DB_USER) {
            uri += `${process.env.DB_USER}:${process.env.DB_PASS}@`;
        }
        uri += `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
        return uri;
    }
    
    /**
     * Construct a connection to the DB
     */
    __constructConnection() {
        if (!this.uri) {
            console.error('Cannot connect to DB without URI.');
            return;
        }
      
        mongoose.connect(this.uri, { useNewUrlParser: true });
        mongoose.connection.on('error', err => console.error(err));
        return mongoose.connection;
    }
    
    /**
     * Run any Seeders which haven't been run yet
     */
    __runSeeders() {
        if (!this.db) {
            console.error('Cannot run Seeders without DB connection.');
            return;
        }
      
        const seeders = reqCon('../../db/Seeders', false, /\.js$/);
        seeders.keys().forEach(seederName => {
            new SeederManager(seederName, seeders(seederName));
        });
    }
}

module.exports = new Database();