import { resolve } from 'path';

import express from 'express';
import routes from './routes';

import './config/dotenv';
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/avatar',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    this.server.use(
      '/docs',
      express.static(resolve(__dirname, '..', 'docs', 'apidoc'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
