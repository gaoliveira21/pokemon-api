import request from 'supertest';
import { resolve } from 'path';
import App from '../../src/app';
import db from '../../src/database';

import authConfig from '../../src/config/auth';
import User from '../../src/app/models/User';

/* eslint-disable no-undef */
describe('Avatar upload', () => {
  afterAll(() => {
    db.close();
  });

  it('should upload a file', async () => {
    const user = await User.findOne({ email: 'user@mail.com' });

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
