import express from 'express';
import cors from 'cors';
import { config } from './src/config/config';
import { router } from './src/routes/rootRouter';
import { errorHandler } from './src/middlewares/errorHandlerMiddleware';
import { authenticateUser } from './src/middlewares/authenticationMiddleware';

const app = express();

const HEALTHCHECK_PATH = '/healthcheck';


// Error Handling Middleware (must be last)
app.use(cors())
app.use(express.json());

app.get(HEALTHCHECK_PATH, (request, response) => {
  response.status(200).json({ status: 'ok', message: 'API is healthy' });
});

app.use('/api', router);

app.use(authenticateUser);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  console.log(`Access health check at http://localhost:${config.port}${HEALTHCHECK_PATH}`);
});
