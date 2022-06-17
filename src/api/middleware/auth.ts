import { IncomingMessage, ServerResponse } from 'http';

export default function auth(
  request: IncomingMessage,
  response: ServerResponse
): boolean {
  const header = request.headers['authorization'];

  if (!header) {
    response.writeHead(401, { 'Content-Type': 'text/plain' });
    response.end('Unauthorized');
    return false;
  } else return true;
}
