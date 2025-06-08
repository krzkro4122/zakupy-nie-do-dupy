import type { ProductBase, ProductResolved } from "../../../shared/types/product";
import { fetchAllItems, postItem, deleteItem, updateItem } from "./rest";

export const fetchProducts = async () => {
    return await fetchAllItems<ProductResolved>('products');
};

export const postProduct = async (product: ProductBase) => {
    return await postItem<ProductBase, ProductResolved>('products', product);
};

export const deleteProduct = async (id: string) => {
    return await deleteItem('products', id);
};

export const updateProduct = async (id: string, updatedProduct: ProductBase) => {
    return await updateItem<ProductBase, ProductResolved>('products', id, updatedProduct);
};
