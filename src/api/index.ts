import { readFileSync } from 'node:fs';
import * as http from 'node:http';
import * as https from 'node:https';
import { initConfig } from '../utils/config';
import initAPI from './api';

const config = initConfig();

export default function createServer(): http.Server | https.Server {
  let server: http.Server | https.Server;

  if (config.server.secure) {
    server = https.createServer({
      cert: readFileSync(config.server.certificates.cert),
      key: readFileSync(config.server.certificates.key),
    });
  } else server = http.createServer();

  server.listen(config.server.port);

  if (config.api.enabled) initAPI(server);

  return server;
}
