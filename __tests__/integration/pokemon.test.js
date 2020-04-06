import request from 'supertest';
import App from '../../src/app';
import db from '../../src/database';

import authConfig from '../../src/config/auth';
import User from '../../src/app/models/User';
import Pokemon from '../../src/app/models/Pokemon';

/* eslint-disable no-undef */
describe('Pokemons', () => {
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

  beforeAll(async () => {
    data.pokemon = await Pokemon.create({
      name: 'Pikachu',
      description: 'this is my first pokemon',
      attributes: {
        atk: 250,
        def: 70,
        spd: 200,
        spAtack: 150,
        spDef: 100,
        hp: 100,
      },
      skills: [
        {
          name: 'skill 01',
          description: 'first skill',
          force: 100,
        },
      ],
      type: 'eletric',
    });
  });

  afterAll(() => {
    db.close();
  });

  it('should show details of a pokemon', async () => {
    const { user } = data;
    const { _id } = data.pokemon;

    const response = await request(App)
      .get(`/pokemons/${_id}`)
      .set('authorization', `Bearer ${user.generateToken(authConfig)}`);

    expect(response.status).toBe(200);
  });

  it('should list pokemons', async () => {
    const { user } = data;

    const response = await request(App)
      .get('/pokemons')
      .set('authorization', `Bearer ${user.generateToken(authConfig)}`);

    expect(response.status).toBe(200);
  });

  it('should create a pokemon', async () => {
    const { user } = data;

    const response = await request(App)
      .post('/pokemons')
      .set('authorization', `Bearer ${user.generateToken(authConfig)}`)
      .send({
        name: 'Charmander',
        description: 'this is my first pokemon',
        attributes: {
          atk: 250,
          def: 70,
          spd: 200,
          spAtack: 150,
          spDef: 100,
          hp: 100,
        },
        skills: [
          {
            name: 'skill 01',
            description: 'first skill',
            force: 100,
          },
        ],
        type: 'fire',
      });

    expect(response.status).toBe(201);
  });

  it('should not exist two pokemons with same name', async () => {
    const { user } = data;

    const response = await request(App)
      .post('/pokemons')
      .set('authorization', `Bearer ${user.generateToken(authConfig)}`)
      .send({
        name: 'Pikachu',
        description: 'this is my first pokemon',
        attributes: {
          atk: 250,
          def: 70,
          spd: 200,
          spAtack: 150,
          spDef: 100,
          hp: 100,
        },
        skills: [
          {
            name: 'skill 01',
            description: 'first skill',
            force: 100,
          },
          {
            name: 'skill 02',
            description: 'second skill',
            force: 100,
          },
        ],
        type: 'eletric',
      });

    expect(response.status).toBe(400);
  });

  it('should update a pokemon', async () => {
    const { user } = data;
    const { _id } = data.pokemon;

    const response = await request(App)
      .put(`/pokemons/${_id}`)
      .set('authorization', `Bearer ${user.generateToken(authConfig)}`)
      .send({
        attributes: {
          atk: 500,
          def: 500,
          hp: 1000,
        },
      });

    expect(response.status).toBe(200);
  });

  it('should remove a pokemon', async () => {
    const { user } = data;
    const { _id } = data.pokemon;

    const response = await request(App)
      .delete(`/pokemons/${_id}`)
      .set('authorization', `Bearer ${user.generateToken(authConfig)}`);

    expect(response.status).toBe(200);
  });
});
