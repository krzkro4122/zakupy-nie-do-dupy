import { Router } from 'express';
import { login, logout } from '../controllers/authenticationController';

export const authenticationRouter = Router();

authenticationRouter.get('/login', login);
authenticationRouter.get('/logout', logout);
// authenticationRouter.get('/register', register);
