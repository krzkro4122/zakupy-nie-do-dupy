import type { CartBase, CartItemBase, CartResolved } from "../types/cart";
import { cartDAO, cartItemDAO } from "../DAO/cartDAO";
import { getUser } from "./authentication";
import type { Id } from "../types/common";

export const getActiveCart = async () => {
    const activeCarts = await fetchActiveCarts();
    if (activeCarts && activeCarts.length > 0) {
        return activeCarts[0];
    }
    return null;
}

export const fetchCartItems = async () => {
    const activeCart = await getActiveCart();
    if (activeCart) {
        return await cartItemDAO.queryItems();
    }
    return [];
};

export const postCartItem = async (cartItem: CartItemBase) => {
    const activeCart = await getActiveCart();
    if (activeCart) {
        return await cartItemDAO.addItem({ ...cartItem, cart: activeCart.id });
    }
    return null;
};

export const deleteCartItem = async (id: Id) => {
    const activeCart = await getActiveCart();
    if (activeCart) {
        return await cartItemDAO.removeItem(id);
    }
    return null;
};

export const updateCartItem = async (id: Id, updatedCartItem: CartItemBase) => {
    const activeCart = await getActiveCart();
    if (activeCart) {
        return await cartItemDAO.amendItem(id, { ...updatedCartItem, cart: activeCart.id });
    }
    return null;
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
    const user = getUser();
    if (user) {
        return [await cartDAO.addItem({ isBought: false, user: user.id })];
    }
    return [];
};

export const postCart = async (cart: CartBase) => {
    return await cartDAO.addItem(cart);
};

export const deleteCart = async (id: Id) => {
    return await cartDAO.removeItem(id);
};

export const updateCart = async (id: Id, updatedCart: CartBase) => {
    return await cartDAO.amendItem(id, updatedCart);
};
