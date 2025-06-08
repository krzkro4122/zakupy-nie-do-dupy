import type { ProductBase, ProductResolved } from "../../../shared/types/product";
import { fetchAllItems, postItem, deleteItem, updateItem } from "./rest";

export const fetchShoppingList = async () => {
    return await fetchAllItems<ProductResolved>('shopping-list');
};

export const postShoppingListItem = async (product: ProductBase) => {
    return await postItem<ProductBase, ProductResolved>('shopping-list', product);
};

export const deleteShoppingListItem = async (id: string) => {
    return await deleteItem('shopping-list', id);
};

export const updateShoppingListItem = async (id: string, updatedProduct: ProductBase) => {
    return await updateItem<ProductBase, ProductResolved>('shopping-list', id, updatedProduct);
};
