import express from 'express';
import { config } from './src/config/config';
import { router } from './src/routes/rootRouter';
import { errorHandler } from './src/middlewares/errorHandlerMiddleware';
import { authenticateUser } from './src/middlewares/authMiddleware';

const app = express();

const HEALTHCHECK_PATH = '/healthcheck';

app.get(HEALTHCHECK_PATH, (request, response) => {
  response.status(200).json({ status: 'ok', message: 'API is healthy' });
});

app.use('/api', router);

// Error Handling Middleware (must be last)
app.use(express.json());
app.use(authenticateUser);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  console.log(`Access health check at http://localhost:${config.port}${HEALTHCHECK_PATH}`);
});
