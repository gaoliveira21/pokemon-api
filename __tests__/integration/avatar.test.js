import request from 'supertest';
import { resolve } from 'path';
import App from '../../src/app';
import db from '../../src/database';

import authConfig from '../../src/config/auth';
import User from '../../src/app/models/User';

/* eslint-disable no-undef */
describe('Avatar upload', () => {
  const data = {};

  beforeEach(async () => {
    await User.create({
      name: 'User',
      email: 'user@mail.com',
      password: '123456',
    });

    data.user = await User.findOne({ email: 'user@mail.com' });
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(() => {
    db.close();
  });

  it('should upload a file', async () => {
    const { user } = data;

    const response = await request(App)
      .post('/avatar')
      .attach(
        'avatar',
        resolve(__dirname, '..', 'assets', 'images', 'profile.png')
      )
      .set('authorization', `Bearer ${user.generateToken(authConfig)}`);

    expect(response.status).toBe(201);
  });
});
