const RestfulController = require('../Controllers/Abstract/RestfulController');
const {expect} = require('chai');

let restfulController;

describe('Restful Controller', () => {
  
    before(() => {
        restfulController = new RestfulController();
    });
    
    context('after instantiation', () => {
        
        it('should be an object', () => {
            expect(restfulController).to.be.an('object');
        });
        
        it('should have method __initRoutes', () => {
            expect(restfulController).to.have.property('__initRoutes');
            expect(restfulController.__initRoutes).to.be.a('function');
        });
        
        it('should have action listAction', () => {
            expect(restfulController).to.have.property('listAction');
            expect(restfulController.listAction).to.be.a('function');
        });
        
        it('should have action createAction', () => {
            expect(restfulController).to.have.property('createAction');
            expect(restfulController.createAction).to.be.a('function');
        });
        
        it('should have action detailAction', () => {
            expect(restfulController).to.have.property('detailAction');
            expect(restfulController.detailAction).to.be.a('function');
        });
        
        it('should have action deleteAction', () => {
            expect(restfulController).to.have.property('deleteAction');
            expect(restfulController.deleteAction).to.be.a('function');
        });
        
        it('should have action updateAction', () => {
            expect(restfulController).to.have.property('updateAction');
            expect(restfulController.updateAction).to.be.a('function');
        });
        
    });
    
});