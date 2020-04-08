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

/**
 * @api {post} /users
 * @apiName CreateUsers
 * @apiGroup Users
 *
 * @apiParam {String} email Valid e-mail (example@example.com)
 * @apiParam {String} name Fullname of the user
 * @apiParam {String} password Password of the user minimum(6)
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    "email": "user@mail.com",
 *    "name": "User",
 *    "password": "123456"
 *  }
 *
 * @apiSuccess (Success 201) {String} _id User ID
 * @apiSuccess (Success 201) {String} email E-mail of the (example@example.com)
 * @apiSuccess (Success 201) {String} name  Fullname of the user
 * @apiSuccess (Success 201) {Boolean} success
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *  {
 *    "user": {
 *      "_id": "5e8c85cdb62623002770846e",
 *      "name": "User",
 *      "email": "user@mail.com"
 *    },
 *    "success": true
 *  }
 *
 * @apiError (Error 400) UserExists The email sent already exists in database
 * @apiError (Error 400) InvalidParams Invalid params sent
 *
 * @apiErrorExample {json} UserExists:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "success": false,
 *    "error": "User already exists"
 *  }
 *
 * @apiErrorExample {json} InvalidParams:
 * HTTP/1.1 400 Bad Request
 * {
 *    "success": false,
 *    "error": "ValidationError",
 *    "details": [
 *      "password must be at least 6 characters"
 *    ]
 * }
 *
 */

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.post('/avatar', uploads.single('avatar'), AvatarController.store);

routes.put('/users', UserController.update);

routes.get('/pokemons', PokemonController.index);
routes.get('/pokemons/:id', PokemonController.show);
routes.post('/pokemons', PokemonController.store);
routes.put('/pokemons/:id', PokemonController.update);
routes.delete('/pokemons/:id', PokemonController.delete);

export default routes;
