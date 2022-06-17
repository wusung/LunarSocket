import { IncomingMessage, ServerResponse } from 'node:http';
import { stats as st } from '../../utils/stats';
import auth from '../middleware/auth';

export default function stats(
  request: IncomingMessage,
  response: ServerResponse
): void {
  if (!auth(request, response)) return;

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(st));
  response.end();
}
