describe('environment url', () => {
    beforeAll(() => process.env.EC2_URL = 'http://www.production.com:3000/');
    beforeEach(() => { 
        jest.resetModules();
    });
    afterEach(() => delete process.env.NODE_ENV);
    afterAll(() => delete process.env.EC2_URL);
    it('gives localhost with port 8080 on when NODE_ENV environment variable is not production', () => {
        process.env.NODE_ENV = 'development';
        const environment = require('../../src/environment').environment; 
        expect(environment.context).toEqual('http://localhost:8080/');
    });

    it('gives production url and port set in environment variable EC2_URL when NODE_ENV environment variable is production', () => {
        process.env.NODE_ENV = 'production';
        const environment = require('../../src/environment').environment; 
        expect(environment.context).toEqual('http://www.production.com:3000/');
    });
});