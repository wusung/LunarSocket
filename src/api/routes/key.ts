import { Router } from 'express';
import auth from '../middleware/auth';

const keyRouter = Router();

keyRouter.post('/', auth, (request, response) => {
  response.sendStatus(200);
});

export default keyRouter;
