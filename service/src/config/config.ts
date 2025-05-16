import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
  port: number;
  databaseUrl: string;
}

export const config: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  databaseUrl: process.env.DATABASE_URL || 'http://localhost:8090',
};

if (isNaN(config.port)) {
  console.error('FATAL ERROR: PORT must be a number.');
  process.exit(1);
}
