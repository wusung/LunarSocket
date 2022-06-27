import { readFileSync } from 'node:fs';
import { IncomingMessage, ServerResponse } from 'node:http';
import { join } from 'node:path';
import method from '../middleware/method';

const htmlDashboard = readFileSync(
  join(__dirname, '..', '..', '..', 'dashboard', 'index.html')
);

export async function dashboard(
  request: IncomingMessage,
  response: ServerResponse
): Promise<void> {
  if (!method('GET', request, response)) return;

  response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  response.write(htmlDashboard);
  response.end();
}
