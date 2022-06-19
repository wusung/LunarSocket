import { IncomingMessage, ServerResponse } from 'http';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export default function method(
  method: Method,
  request: IncomingMessage,
  response: ServerResponse
): boolean {
  if (request.method !== method) {
    response.writeHead(405, { 'Content-Type': 'text/plain' });
    response.end('Method not allowed');
    return false;
  } else return true;
}
