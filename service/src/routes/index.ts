import { Router } from 'express';
import {} from './productRoutes';

const router = Router();

// Mount individual routers
router.use('/products', shoppingListRoutes);
router.use('/users', shoppingListRoutes);

export default router;
