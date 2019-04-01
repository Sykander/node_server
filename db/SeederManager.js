const Seeder = require('../Models/Seeder');

/**
 * This Class decides whether a Seeder should be run
 */
class SeederManager
{
    constructor(name, upgrade) {
        if (!name) {
            console.error('Invalid Seeder name.');
            return;
        }
        
        this.name = name;
        
        if (!upgrade || typeof upgrade !== 'function') {
            console.error('Invalid Seeder upgrade.');
            return;
        }
        
        this.upgrade = upgrade;
        
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
            this.__upgrade();
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
     * Handler for upgrade
     */
    __upgrade() {
        return new Promise((resolve, reject) => {
            if (this.upgrade && typeof this.upgrade === 'function') {
                this.upgrade();
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