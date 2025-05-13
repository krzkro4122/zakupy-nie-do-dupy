import { Router } from 'express';
import { getShoppingList, getShoppingListItem, createShoppingListItem } from '../controllers/shoppingListController';

const router = Router();

router.get('/', getShoppingList);
router.get('/:id', getShoppingListItem);
router.post('/', createShoppingListItem);
// Add other routes (PUT for update, DELETE for delete)

export default router;
