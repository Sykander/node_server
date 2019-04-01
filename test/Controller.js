const Controller = require('../Controllers/Abstract/Controller');
const {expect} = require('chai');

let controller;

describe('Controller', () => {
  
    before(() => {
        controller = new Controller();
    });
    
    context('after instantiation', () => {
        
        it('should be an object', () => {
            expect(controller).to.be.an('object');
        });
        
        it('should have method __getRoute', () => {
            expect(controller).to.have.property('__getRoute');
            expect(controller.__getRoute).to.be.a('function');
        });
        
        it('should return a String from __getRoute', () => {
            expect(controller.__getRoute()).to.be.a('string');
        });
        
        it('should have property route', () => {
            expect(controller.route).to.be.a('string');
            expect(
                controller.route.charAt(0),
                'route should start with a slash'
            ).to.equal('/');
        })
        
        it('should have method __getRouter', () => {
            expect(controller).to.have.property('__getRouter');
            expect(controller.__getRouter).to.be.a('function');
        });
        
        it('should have property router', () => {
            expect(controller).to.have.property('router');
        })
        
        it('should have method __initRoutes', () => {
            expect(controller).to.have.property('__initRoutes');
            expect(controller.__initRoutes).to.be.a('function');
        });
        
    });
    
});