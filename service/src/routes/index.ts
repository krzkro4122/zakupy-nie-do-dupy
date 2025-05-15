import { Router } from 'express';
import shoppingListRoutes from './productRoutes';

const router = Router();

// Mount individual routers
router.use('/shopping-list', shoppingListRoutes);
router.use('/users', shoppingListRoutes);

export default router;
