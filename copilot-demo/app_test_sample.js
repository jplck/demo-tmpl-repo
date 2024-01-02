const request = require('supertest');
const app = require('./app');

describe('POST /email', () => {
  it('should respond with a 400 status code for invalid email', async () => {
    const response = await request(app)
      .post('/email')
      .send({ email: 'invalid email' });
    expect(response.statusCode).toBe(400);
  });

  it('should respond with a 400 status code for missing email', async () => {
    const response = await request(app)
      .post('/email')
      .send({});
    expect(response.statusCode).toBe(400);
  });
});