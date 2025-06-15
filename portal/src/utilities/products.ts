import type { ProductBase } from "../types/product";
import { productDAO } from "../DAO/productDAO";
import type { Id } from "../types/common";

export const fetchProducts = async () => {
    return await productDAO.queryItems();
};

export const postProduct = async (product: ProductBase) => {
    return await productDAO.addItem(product);
};

export const deleteProduct = async (id: Id) => {
    return await productDAO.removeItem(id);
};

export const updateProduct = async (id: Id, updatedProduct: ProductBase) => {
    return await productDAO.amendItem(id, updatedProduct);
};
