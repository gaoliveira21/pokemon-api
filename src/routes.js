import { Router } from 'express';

// import multer from 'multer';
// import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PokemonController from './app/controllers/PokemonController';
import AvatarController from './app/controllers/AvatarController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
// const uploads = multer(multerConfig).single('avatar');

/**
 * @api {post} /users Create user
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
 * @apiSuccess (Success 201) {String} email E-mail of the user (example@example.com)
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
 * @apiError (Error 400) ValidationError Invalid params sent
 *
 * @apiErrorExample {json} UserExists:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "success": false,
 *    "error": "User already exists"
 *  }
 *
 * @apiErrorExample {json} ValidationError:
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

/**
 * @api {post} /sessions Start session
 * @apiName StartSession
 * @apiGroup Users
 *
 * @apiParam {String} email E-mail used on register
 * @apiParam {String} password Password used on register
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    email: "user@mail.com",
 *    password: "123456"
 * }
 *
 * @apiSuccess (Success 201) {String} _id User ID
 * @apiSuccess (Success 201) {String} email User e-mail
 * @apiSuccess (Success 201) {String} name Fullname of the user
 * @apiSuccess (Success 201) {String} token JWT Token
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 * {
 *    "user": {
 *      "_id": "5e8c85cdb62623882770849e",
 *      "name": "User",
 *      "email": "user@mail.com"
 *    },
 *    "token": "eyJhbGcTOIJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjVlOGM4NWNkYjYyNjIzMDAyNzcwODQ2ZSIsImlhdCI6MTU4NjM2ODM0MSwiZXhwIjoxNTg2OTczMTQxfQ.hSRy7GFR3e3mFC3FTXom6wNA7ufsCO_KDLRtB29bxzQ"
 * }
 *
 * @apiError (Error 401) UserNotFound not found a user with email sent
 * @apiError (Error 401) InvalidPassword password sent does not match with password in database
 * @apiError (Error 400) ValidationError Invalid params sent
 *
 * @apiErrorExample {json} UserNotFound:
 *  HTTP/1.1 401 Unauthorized
 * {
 *    "success": false,
 *    "error": "User not found"
 * }
 *
 * @apiErrorExample {json} InvalidPassword:
 *  HTTP/1.1 401 Unauthorized
 * {
 *    "success": false,
 *    "error": "Password does not match"
 * }
 *
 * @apiErrorExample {json} ValidationError:
 *  HTTP/1.1 401 Unauthorized
 * {
 *    "success": false,
 *    "error": "ValidationError",
 *    "details": [
 *      "password is a required field"
 *    ]
 * }
 *
 */
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

/**
 * @api {post} /avatar Upload avatar
 * @apiName UploadAvatar
 * @apiGroup File
 *
 * @apiParam {File} avatar File for upload
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "avatar": "/path/filename.ext"
 * }
 *
 * @apiSuccess (201) {String} _id Avatar unique ID
 * @apiSuccess (201) {String} path Avatar filename
 * @apiSuccess (201) {String} url URL to access file
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 * {
 *    "_id": "5e8626c31fe5ea90a105d00d",
 *    "path": "f6421cd186d84127ba8dd71e69961585850050995.png",
 *    "url": "http://localhost:3333/avatar/f6421cd186d84127ba8dd71e69961585850050995.png"
 * }
 *
 * @apiError (Error 400) InvalidFileExtension Invalid file sent
 * @apiError (Error 400) NoFileSent avatar is a required field and did not was sent
 *
 * @apiErrorExample {json} InvalidFileExtension:
 *  HTTP/1.1 400 Bad Request
 * {
 *    "error": "file extension is not permitted"
 * }
 *
 * @apiErrorExample {json} NoFileSent:
 *  HTTP/1.1 400 Bar Request
 *  {
 *    "error": "ValidationError",
 *    "details": [
 *      "file is a required field"
 *    ]
 *  }
 *
 */
routes.post('/avatar', AvatarController.store);

routes.put('/users', UserController.update);

routes.get('/pokemons', PokemonController.index);
routes.get('/pokemons/:id', PokemonController.show);
routes.post('/pokemons', PokemonController.store);
routes.put('/pokemons/:id', PokemonController.update);
routes.delete('/pokemons/:id', PokemonController.delete);

export default routes;
