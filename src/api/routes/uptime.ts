import { IncomingMessage, ServerResponse } from 'node:http';
import auth from '../middleware/auth';

export default function uptime(
  request: IncomingMessage,
  response: ServerResponse
): void {
  if (!auth(request, response)) return;

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ uptime: process.uptime() }));
  response.end();
}
