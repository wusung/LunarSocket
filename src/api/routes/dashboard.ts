import * as express from 'express';
import { join } from 'node:path';

const path = join(__dirname, '..', '..', '..', 'dashboard');
export default express.static(path);
