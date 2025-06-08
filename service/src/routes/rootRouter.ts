import { Router } from 'express';
import { productRouter } from './productRouter';
import { userRouter } from './userRouter';
import { authenticationRouter } from './authenticationRouter';
import { cartRouter } from './cartRouter';

export const router = Router();

router.use('/users', userRouter);
router.use('/authentication', authenticationRouter);
router.use('/products', productRouter);
router.use('/carts', cartRouter);
