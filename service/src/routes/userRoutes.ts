import { Router } from 'express';


const router = Router();

router.get('/', getShoppingList);
router.get('/:id', getShoppingListItem);
router.post('/', createShoppingListItem);
// Add other routes (PUT for update, DELETE for delete)

export default router;
