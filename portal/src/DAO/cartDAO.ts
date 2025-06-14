import type { CartBase, CartResolved, CartItemBase, CartItemResolved } from '../types/cart';
import { DAO } from './DAO';

class CartDAO extends DAO<CartResolved, CartBase> { }

export const cartDAO = new CartDAO('carts');


class CartItemDAO extends DAO<CartItemResolved, CartItemBase> { }

export const cartItemDAO = new CartItemDAO('cartItems');
