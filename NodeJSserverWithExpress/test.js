const server = require('./server.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('User Endpoints', () => {

    it('GET /user should show all users', async () => {
        const res = await requestWithSupertest.get('/users');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('users')
    });

    it('GET /user/:id should show a user', async () => {
        const res = await requestWithSupertest.get('/users/3')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
    });
});

describe('My Endpoints', () => {
    it('GET /frases/random debe traer un string', async () => {
        const res = await requestWithSupertest.get('/frases/random')
        expect(res.status).toEqual(200)
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('Frase')
    });

    it('GET /ops/suma sumar dos numeros', async () => {
        const res = await requestWithSupertest.get('/ops/suma?num1=10&num2=10')
        expect(res.statusCode).toEqual(200)
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('suma', 20)
    });
});