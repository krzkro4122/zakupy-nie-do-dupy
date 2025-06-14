import type { ProductBase } from "../types/product";
import { productDAO } from "../DAO/productDAO";

export const fetchProducts = async () => {
    return await productDAO.queryItems();
};

export const postProduct = async (product: ProductBase) => {
    return await productDAO.addItem(product);
};

export const deleteProduct = async (id: string) => {
    return await productDAO.removeItem(id);
};

export const updateProduct = async (id: string, updatedProduct: ProductBase) => {
    return await productDAO.amendItem(id, updatedProduct);
};
