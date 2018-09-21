describe('environment url', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    afterEach(() => delete process.env.NODE_ENV);
    it('gives localhost with port 9002 on when NODE_ENV environment variable is not production', () => {
        process.env.NODE_ENV = 'development';
        const environment = require('../../src/environment').environment;
        expect(environment.context).toEqual('http://localhost:9002/');
    });

    it('gives production url', () => {
        process.env.NODE_ENV = 'production';
        const environment = require('../../src/environment').environment;
        expect(environment.context).toEqual('http://ec2-18-224-1-78.us-east-2.compute.amazonaws.com:9002/');
    });
});