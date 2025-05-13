import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
  port: number;
  // Add other configuration variables here
  // exampleDbUrl: string;
}

const config: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  // exampleDbUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/mydb',
};

if (isNaN(config.port)) {
  console.error('FATAL ERROR: PORT must be a number.');
  process.exit(1);
}

export default config;
