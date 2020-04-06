import request from 'supertest';
import App from '../../src/app';
import db from '../../src/database';

import authConfig from '../../src/config/auth';
import User from '../../src/app/models/User';

/* eslint-disable no-undef */
describe('Authentication', () => {
  beforeEach(async () => {
    await User.create({
      name: 'User',
      email: 'user@mail.com',
      password: '123456',
    });
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(() => {
    db.close();
  });

  it('should authenticated with valid credentials', async () => {
    const response = await request(App).post('/sessions').send({
      email: 'user@mail.com',
      password: '123456',
    });

    expect(response.status).toBe(201);
  });

  it('should not authenticate with invalid credentials', async () => {
    const response = await request(App).post('/sessions').send({
      email: 'user@mail.com',
      password: '234324',
    });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const response = await request(App).post('/sessions').send({
      email: 'user@mail.com',
      password: '123456',
    });

    expect(response.body).toHaveProperty('token');
  });

  it('should not access private routes when not authenticated', async () => {
    const response = await request(App).get('/pokemons');

    expect(response.status).toBe(401);
  });

  it('should access private routes when authenticated', async () => {
    const user = await User.findOne({ email: 'user@mail.com' });

    const response = await request(App)
      .get('/pokemons')
      .set('authorization', `Bearer ${user.generateToken(authConfig)}`);

    expect(response.status).toBe(200);
  });
});
