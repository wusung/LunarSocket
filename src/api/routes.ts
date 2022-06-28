import { Express } from 'express';
import dashboard from './routes/dashboard';
import rolesRouter from './routes/roles';
import statsRouter from './routes/stats';

export default function registerRoutes(app: Express): void {
  app.use('/api/stats', statsRouter);
  app.use('/api/roles', rolesRouter);

  app.use('/dashboard', dashboard);

  app.get('/', (request, response) => response.sendStatus(200));
}
