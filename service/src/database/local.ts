import { randomUUID } from "crypto";
import { Product } from "../types/product";

const products: Product[] = [
    { id: randomUUID(), name: 'Milk' },
    { id: randomUUID(), name: 'Bread' },
    { id: randomUUID(), name: 'Puff Pastry' },
];

export const queryProducts = () => {
    return products;
};

export const queryProductById = (id: string) => {
    return products.find(item => item.id === id);
};

export const addProduct = (product: Product) => {
    products.push(product);
    return true;
}

export const deleteProduct = (productToDelete: Product) => {
    const index = products.findIndex(product => product.id === productToDelete.id);
    if (index > -1) {
        products.splice(index, 1);
        return true;
    }
    return false;
}
