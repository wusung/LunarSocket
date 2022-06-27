import { IncomingMessage, ServerResponse } from 'node:http';
import { dashboard } from './routes/dashboard';
import roles from './routes/roles';
import stats from './routes/stats';

export default function registerRoutes(): {
  [key: string]: (request: IncomingMessage, response: ServerResponse) => void;
} {
  return {
    '/': (request, response) => {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end();
    },
    '/api/stats': stats,
    '/api/roles': roles,
    '/dashboard': dashboard,
  };
}
