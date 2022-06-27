import { IncomingMessage, ServerResponse } from 'node:http';
import { connectedPlayers } from '../..';
import { DatabaseManager } from '../../databases/Manager';
import { stats as st } from '../../utils/stats';
import method from '../middleware/method';

export default async function stats(
  request: IncomingMessage,
  response: ServerResponse
): Promise<void> {
  if (!method('GET', request, response)) return;
  // if (!auth(request, response)) return;

  const stats = {
    uptime: Math.round(process.uptime()),
    online: connectedPlayers.length,
    onlineGraph: st,
    uniquePlayerCount: await DatabaseManager.instance.database.getPlayerCount(),
  };

  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  response.write(JSON.stringify(stats));
  response.end();
}
