import type { CartBase, CartResolved, CartItemBase, CartItemResolved } from '../types/cart';
import { DAO } from './DAO';

class CartDAO extends DAO<CartResolved, CartBase> { }

export const cartDAO = new CartDAO({collectionName: 'carts', relationToExpand: 'user'});


class CartItemDAO extends DAO<CartItemResolved, CartItemBase> { }

export const cartItemDAO = new CartItemDAO({collectionName: 'cartItems', relationToExpand: 'cart,product'});
