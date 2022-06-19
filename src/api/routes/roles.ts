import { IncomingMessage, ServerResponse } from 'node:http';
import { connectedPlayers } from '../..';
import auth from '../middleware/auth';
import method from '../middleware/method';

export default async function roles(
  request: IncomingMessage,
  response: ServerResponse
): Promise<void> {
  if (!method('PATCH', request, response)) return;
  if (!auth(request, response)) return;

  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });

  request.on('end', async () => {
    let body: RolesRequestBody;

    try {
      body = JSON.parse(data);

      if (typeof body.uuid !== 'string' || typeof body.role !== 'string')
        throw new Error('Invalid request body');
    } catch (error) {
      response.writeHead(400, { 'Content-Type': 'text/plain' });
      return void response.end('Invalid JSON');
    }

    const player = connectedPlayers.find((p) => p.uuid === body.uuid);
    if (!player) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      return void response.end('Player not found or not online');
    }

    const oldRole = player.role.name;
    await player.setRole(body.role);

    if (oldRole === player.role.name) {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      return void response.end('No change');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      return void response.end('OK');
    }
  });
}

interface RolesRequestBody {
  uuid: string;
  role: string;
}
