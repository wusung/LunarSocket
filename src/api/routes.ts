import { IncomingMessage, ServerResponse } from 'node:http';
import stats from './routes/stats';
import uptime from './routes/uptime';

export default function registerRoutes(): {
  [key: string]: (request: IncomingMessage, response: ServerResponse) => void;
} {
  return {
    '/': (request, response) => {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end();
    },
    '/api/stats': stats,
    '/api/uptime': uptime,
  };
}
