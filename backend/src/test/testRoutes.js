const request = require('supertest');
const app = require('../src/app');

describe('Test API Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ nombre: 'Test User', email: 'testuser@gmail.com', contraseña: 'testpassword' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });
});
