import pkg from 'pg';
const { Pool } = pkg;
import { DB_CONNECTION } from './config.js';

export const conmyslq = new Pool({
  connectionString: DB_CONNECTION,
  ssl: { rejectUnauthorized: false }
});