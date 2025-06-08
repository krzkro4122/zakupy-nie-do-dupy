import type { CartItemBase, CartItemResolved } from "../../../shared/types/cart";
import { fetchAllItems, postItem, deleteItem, updateItem } from "./rest";

export const fetchCart = async () => {
    return await fetchAllItems<CartItemResolved>('cart');
};

export const postCartItem = async (cartItem: CartItemBase) => {
    return await postItem<CartItemBase, CartItemResolved>('cart', cartItem);
};

export const deleteCartItem = async (id: string) => {
    return await deleteItem('cart', id);
};

export const updateCartItem = async (id: string, updatedCartItem: CartItemBase) => {
    return await updateItem<CartItemBase, CartItemResolved>('cart', id, updatedCartItem);
};
