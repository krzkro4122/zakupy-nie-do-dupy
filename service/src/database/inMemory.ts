import { randomUUID, UUID } from "crypto";
import { ProductBase, ProductResolved } from "../types/product";

const products: ProductResolved[] = [
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

export const addProduct = (product: ProductResolved) => {
    products.push(product);
    return product;
}

export const removeProduct = (id: UUID) => {
    const index = products.findIndex(product => product.id === id);
    if (index > -1) {
        const deletedProduct = products.splice(index, 1);
        return deletedProduct;
    }
}

export const amendProduct = (id: UUID, productToUpdate: ProductResolved) => {
    const product = products.find(product => product.id === id);
    if (product) {
        if (productToUpdate.id) {
            product.id = productToUpdate.id;
        }
        product.name = productToUpdate.name;
        return product;
    }
}
