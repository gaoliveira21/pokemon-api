import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PokemonController from './app/controllers/PokemonController';
import AvatarController from './app/controllers/AvatarController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

/**
 * @apiDefine Authorization
 * @apiHeader {String} token Users unique access-token
 * @apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "Bearer eyJhbGcTOIJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjVlOGM4NWNkYjYyNjIzMDAyNzcwODQ2ZSIsImlhdCI6MTU4NjM2ODM0MSwiZXhwIjoxNTg2OTczMTQxfQ.hSRy7GFR3e3mFC3FTXom6wNA7ufsCO_KDLRtB29bxzQ"
 * }
 */

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
 * @apiUse Authorization
 *
 * @apiParam {File} avatar File for upload
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "avatar": "/path/filename.ext"
 * }
 *
 * @apiSuccess (Success 201) {String} _id Avatar unique ID
 * @apiSuccess (Success 201) {String} path Avatar filename
 * @apiSuccess (Success 201) {String} url URL to access file
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

/**
 * @api {put} /user Update user
 * @apiName UserUpdate
 * @apiGroup Users
 *
 * @apiUse Authorization
 *
 * @apiParam {String} [name] New fullname of the user
 * @apiParam {String} [email] New e-mail of the user
 * @apiParam {String} [oldPassword] Old password of the user (<b>required if user have been changing his password<b>)
 * @apiParam {String} [password] New password of the user
 * @apiParam {String} [confirmPassword] This field need match with password (<b>required if user have been changing his password<b>)
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "email": "newemail@mail.com",
 *    "name": "New name",
 *    "oldPassword": "123456",
 *    "password": "mynewpassword",
 *    "confirmPassword": "mynewpassword"
 * }
 *
 * @apiSuccess (Success 200) {String} _id User ID
 * @apiSuccess (Success 200) {String} name Fullname of the user
 * @apiSuccess (Success 200) {String} email E-mail of the user (example@example.com)
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "_id": "5e874a2bbedf244cc32b0d3a",
 *    "name": "New name",
 *    "email": "newemail@mail.com"
 *  }
 *
 * @apiError (Error 400) InvalidPassword password sent does not match with password in database
 * @apiError (Error 400) UserExists The email sent already exists in database
 * @apiError (Error 400) ValidationError Invalid params sent
 *
 * @apiErrorExample {json} InvalidPassword:
 *  HTTP/1.1 401 Unauthorized
 * {
 *    "success": false,
 *    "error": "Password does not match"
 * }
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
 */
routes.put('/users', UserController.update);

/**
 * @api {get} /pokemons List pokemons
 * @apiName ListPokemons
 * @apiGroup Pokemons
 *
 * @apiUse Authorization
 *
 * @apiParam {Number} [page] current page (<b>default value: 1</b>) - Query Param
 * @apiParam {Number} [limit] limit of pokemons returned - Query Param
 *
 * @apiSuccess (Success 200) {Object} attributes an object with pokemon attributes: (atk, def, spd, spAtack, spDef, hp)
 * @apiSuccess (Success 200) {String} _id Unique ID of a pokemon
 * @apiSuccess (Success 200) {String} name Pokemon name
 * @apiSuccess (Success 200) {String} description Pokemon description
 * @apiSuccess (Success 200) {Object} avatar an object with avatar data: (_id, path, url)
 * @apiSuccess (Success 200) {Array} skills an array of objects, each object contain the follow attributes: (_id, name, description, force)
 * @apiSuccess (Success 200) {String} type Pokemon type
 * @apiSuccess (Success 200) {Number} totalDocs Total of pokemons registered
 * @apiSuccess (Success 200) {Number} limit Number of pokemons returned
 * @apiSuccess (Success 200) {Number} totalPages Total of pages
 * @apiSuccess (Success 200) {Number} page Current page
 * @apiSuccess (Success 200) {Number} pagingCounter The starting sl. number of first document
 * @apiSuccess (Success 200) {Bool} hasPrevPage Availability of prev page
 * @apiSuccess (Success 200) {Number} prevPage Previous page number if available or NULL
 * @apiSuccess (Success 200) {Number} nextPage Next page number if available or NULL
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *    docs: [
 *      attributes: {
 *        atk: 250,
 *        def: 70,
 *        spd: 200,
 *        spAtack: 150,
 *        spDef: 100,
 *        hp: 100
 *      },
 *      _id: "5e95d44bb3dbf80365e95e6b",
 *      name: "Pikachu",
 *      description: "this is my first pokemon",
 *      avatar: {
 *        _id: "5e95e86e808bbe07855738eb",
 *        path: "ddb2e1b5bbdaef07bf1427eac05f1586882670610.jpg",
 *        url: "http://localhost:3333/avatar/ddb2e1b5bbdaef07bf1427eac05f1586882670610.jpg"
 *      },
 *      "skills": [
 *        {
 *          _id: "5e95d44bb3dbf80365e95e6c",
 *          name: "skill 01",
 *          description: "first skill",
 *          force: 100
 *        }
 *      ],
 *      type: "eletric"
 *    ],
 *    totalDocs: 1,
 *    limit: 10,
 *    totalPages: 1,
 *    page: 1,
 *    pagingCounter: 1,
 *    hasPrevPage: false,
 *    hasNextPage: false,
 *    prevPage: null,
 *    nextPage: null
 * }
 */
routes.get('/pokemons', PokemonController.index);

routes.get('/pokemons/:id', PokemonController.show);
routes.post('/pokemons', PokemonController.store);
routes.put('/pokemons/:id', PokemonController.update);
routes.delete('/pokemons/:id', PokemonController.delete);

export default routes;
