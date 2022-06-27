import * as http from 'node:http';
import * as https from 'node:https';
import logger from '../utils/logger';
import registerRoutes from './routes';

export default function initAPI(server: http.Server | https.Server): void {
  logger.log('Initializing API...');
  const routes = registerRoutes();
  server.on('request', (request, response) => {
    // const route = routes[request.url];
    let route;
    for (const r in routes) {
      if (request.url.startsWith(r)) route = routes[r];
    }

    if (route) route(request, response);
    else {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end();
    }
  });
}
