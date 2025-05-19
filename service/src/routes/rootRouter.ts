import { Router } from 'express';
import { productRouter } from './productRouter';
import { userRouter } from './userRouter';
import { authenticationRouter } from './authenticationRouter';

export const router = Router();

router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/authentication', authenticationRouter);
