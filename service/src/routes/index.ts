import { Router } from 'express';
import shoppingListRoutes from './shoppingListRoutes';

const router = Router();

// Mount individual routers
router.use('/shopping-list', shoppingListRoutes);

// Add other route groups here (e.g., router.use('/users', userRoutes);)

export default router;
