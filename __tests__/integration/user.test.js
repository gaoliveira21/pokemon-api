import request from 'supertest';
import App from '../../src/app';
import db from '../../src/database';

import authConfig from '../../src/config/auth';
import User from '../../src/app/models/User';

/* eslint-disable no-undef */
describe('User', () => {
  afterAll(() => {
    db.close();
  });

  it('should create an user', async () => {
    const response = await request(App).post('/users').send({
      name: 'Test',
      email: 'test@test.com',
      password: 'test123',
    });

    expect(response.status).toBe(201);
  });

  it('it should not exists two identical emails', async () => {
    const response = await request(App).post('/users').send({
      name: 'User',
      email: 'user@mail.com',
      password: '123456',
    });

    expect(response.status).toBe(400);
  });

  it('should change password when send old password and confirm new password', async () => {
    const user = await User.findOne({ email: 'user@mail.com' });
    const response = await request(App)
      .put(`/users`)
      .send({
        oldPassword: '123456',
        password: '1234567',
        confirmPassword: '1234567',
      })
      .set('authorization', `Bearer ${user.generateToken(authConfig)}`);

    expect(response.status).toBe(200);
  });
});
