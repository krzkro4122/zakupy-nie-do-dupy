import { Router } from 'express';
import { getCart } from '../controllers/cartController';
import { createCart, deleteCart, updateCart } from '../controllers/cartController';
import { getCarts } from '../controllers/cartController';
import { getCartItems, getCartItem, addCartItem, deleteCartItem, updateCartItem } from '../controllers/CartItemController';
export const cartRouter = Router();

cartRouter.get('/', getCarts);
cartRouter.get('/:id', getCart);
cartRouter.post('/', createCart);
cartRouter.delete('/:id', deleteCart);
cartRouter.put('/:id', updateCart);

cartRouter.get('/:id/items', getCartItems);
cartRouter.get('/:id/items/:itemId', getCartItem);
cartRouter.post('/:id/items', addCartItem);
cartRouter.delete('/:id/items/:itemId', deleteCartItem);
cartRouter.put('/:id/items/:itemId', updateCartItem);
