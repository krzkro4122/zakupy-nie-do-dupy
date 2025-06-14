import type { CartBase, CartItemBase, CartResolved } from "../types/cart";
import { cartDAO, cartItemDAO } from "../DAO/cartDAO";

export const fetchCartItems = async () => {
    const activeCarts = await fetchActiveCarts();
    if (activeCarts && activeCarts.length > 0) {
        if (activeCarts[0]) {
            return await cartItemDAO.queryItems();
        }
    }
    return [];
};

export const postCartItem = async (cartItem: CartItemBase) => {
    return await cartItemDAO.addItem(cartItem);
};

export const deleteCartItem = async (id: string) => {
    return await cartItemDAO.removeItem(id);
};

export const updateCartItem = async (id: string, updatedCartItem: CartItemBase) => {
    return await cartItemDAO.amendItem(id, updatedCartItem);
};


export const fetchCarts = async () => {
    return await cartDAO.queryItems();
};

export const fetchActiveCarts = async () => {
    const carts = await fetchCarts();
    const activeCarts: CartResolved[] = [];
    if (carts) {
        activeCarts.push(...carts.filter((cart) => !cart.isBought));
    }
    if (activeCarts.length > 0) {
        return activeCarts.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
    }
    return [await cartDAO.addItem({ isBought: false })];
};

export const postCart = async (cart: CartBase) => {
    return await cartDAO.addItem(cart);
};

export const deleteCart = async (id: string) => {
    return await cartDAO.removeItem(id);
};

export const updateCart = async (id: string, updatedCart: CartBase) => {
    return await cartDAO.amendItem(id, updatedCart);
};
