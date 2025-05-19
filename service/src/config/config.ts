import dotenv from 'dotenv';

const PocketBase = require('pocketbase/cjs');
dotenv.config();

interface AppConfig {
  port: number;
  databaseUrl: string;
}

export const config: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  databaseUrl: process.env.DATABASE_URL || 'http://127.0.0.1:8090',
};

export const pbConnection = new PocketBase(config.databaseUrl);

if (isNaN(config.port)) {
  console.error('FATAL ERROR: PORT must be a number.');
  process.exit(1);
}
