import * as bodyParser from 'body-parser';
import * as express from 'express';
import logger from '../utils/logger';
import registerRoutes from './routes';

export default function initAPI(): express.Express {
  logger.log('Initializing API...');
  const app = express();

  app.disable('x-powered-by');
  app.use(bodyParser.json());
  registerRoutes(app);

  return app;
}
