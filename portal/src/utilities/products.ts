import type { ProductBase } from "../types/product";
import { productDAO } from "../DAO/productDAO";
import type { Id } from "../types/common";
import { cartItemDAO } from "../DAO/cartDAO";

export const fetchProducts = async () => {
    return await productDAO.queryItems();
};

export const postProduct = async (product: ProductBase) => {
    return await productDAO.addItem(product);
};

export const deleteProduct = async (id: Id) => {
    const cartItems = await cartItemDAO.queryItems(`product = "${id}"`);
    if (cartItems.length > 0) {
        for (const cartItem of cartItems) {
            await cartItemDAO.removeItem(cartItem.id);
        }
    }
    return await productDAO.removeItem(id);
};

export const updateProduct = async (id: Id, updatedProduct: ProductBase) => {
    return await productDAO.amendItem(id, updatedProduct);
};
