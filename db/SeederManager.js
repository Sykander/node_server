const Seeder = require('../Models/Seeder');

/**
 * This Class decides whether a Seeder should be run
 */
class SeederManager
{
    /**
     * Synchronous Constructor
     */
    constructor(name, method) {
        if (!name) {
            console.error('Invalid Seeder name.');
            return;
        }
        this.name = name;
        
        if (!method || typeof method !== 'function') {
            console.error('Invalid Seeder method.');
            return;
        }
        
        this.run = method;
        
        this.__constructor(name, method);
    }
    
    /**
     * Asynchronous Constructor
     */
    async __constructor(name, method) {
        this.record = await this.__getRecord();
        
        if (!this.record) {
            this.record = await this.__createRecord();
        }
        
        if (!this.record.hasRun) {
            this.__run();
        }
    }
    
    /**
     * Gets the Seeder record
     */
    __getRecord() {
        return Seeder.findOne(
            {name: this.name},
            (err, record) => {
                if (err) {
                    console.error(err);
                }
                
                return record;
            }
        );
    }
    
    /**
     * Creates the Seeder record
     */
    __createRecord() {
        return SeederModel({
            name: this.name,
            hasRun: false
        }).save();
    }
    
    /**
     * Updates the Seeder record
     */
    __updateRecord(update) {
        return Seeder.findOneAndUpdate(
            {name: this.name},
            update,
            {useFindAndModify: false},
            (err, record) => {
                if (err) {
                    console.error(err);
                }
                
                return record;
            }
        );
    }
    
    /**
     * Handler for Run method
     */
    __run() {
        return new Promise((resolve, reject) => {
            if (this.run && typeof this.run === 'function') {
                this.run();
                resolve();
            } else {
                console.error('No Seeder method to run.');
                reject();
            }
        })
        .then(() => {
            this.__updateRecord({
                hasRun: true,
                runAt: Date.now()
            });
        })
        .catch(err => {
            console.error(err);
        });
    }
}

module.exports = SeederManager;