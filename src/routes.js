import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PokemonController from './app/controllers/PokemonController';
import AvatarController from './app/controllers/AvatarController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.post('/avatar', uploads.single('avatar'), AvatarController.store);

routes.get('/pokemons', PokemonController.index);
routes.post('/pokemons', PokemonController.store);

export default routes;
