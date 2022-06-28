import { Request, Router } from 'express';
import { connectedPlayers } from '../..';
import auth from '../middleware/auth';

const rolesRouter = Router();

rolesRouter.patch(
  '/',
  (request: Request<{}, {}, RolesRequestBody>, response) => {
    if (!auth(request, response)) return;

    request.on('end', async () => {
      if (
        typeof request.body.uuid !== 'string' ||
        typeof request.body.role !== 'string'
      )
        return response.sendStatus(400);

      const player = connectedPlayers.find((p) => p.uuid === request.body.uuid);
      if (!player) {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        return void response.end('Player not found or not online');
      }

      const oldRole = player.role.name;
      await player.setRole(request.body.role);

      if (oldRole === player.role.name) {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        return void response.end('No change');
      } else {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        return void response.end('OK');
      }
    });
  }
);

export default rolesRouter;

interface RolesRequestBody {
  uuid: string;
  role: string;
}
