import { Router } from 'express';
import { connectedPlayers } from '../..';
import { DatabaseManager } from '../../databases/Manager';
import { stats as st } from '../../utils/stats';

const statsRouter = Router();

statsRouter.get('/', async (request, response) => {
  const stats = {
    uptime: Math.round(process.uptime()),
    online: connectedPlayers.length,
    onlineGraph: st,
    uniquePlayerCount: await DatabaseManager.instance.database.getPlayerCount(),
  };

  response.status(200).send(stats);
});

export default statsRouter;
