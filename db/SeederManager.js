const Seeder = require('../Models/Seeder');

/**
 * This Class decides whether a Seeder should be run
 */
class SeederManager
{
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
        
        this.__constructor();
    }
    
    /** PROTECTED
     * Asynchronous Constructor
     */
    async __constructor() {
        this.record = await this.__getRecord();
        
        if (!this.record) {
            this.record = await this.__createRecord();
        }
        
        if (!this.record.hasRun) {
            this.__run();
        }
    }
    
    /** PROTECTED
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
    
    /** PROTECTED
     * Creates the Seeder record
     */
    __createRecord() {
        return Seeder({
            name: this.name,
            hasRun: false
        }).save();
    }
    
    /** PROTECTED
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
    
    /** PROTECTED
     * Handler for run
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