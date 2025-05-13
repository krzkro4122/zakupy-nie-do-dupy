import express from 'express';
import config from './src/config';
import apiRoutes from './src/routes';
import { errorHandler } from './src/middlewares/errorHandler';

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Basic Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy' });
});

// API Routes
app.use('/api', apiRoutes);

// Error Handling Middleware (must be last)
app.use(errorHandler);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  console.log(`Access health check at http://localhost:${config.port}/health`);
  console.log(`Access shopping list API at http://localhost:${config.port}/api/shopping-list`);
});