import { randomUUID, UUID } from "crypto";
import { ProductResolved } from "../types/product";
import { DAO } from "../types/dao";

const products: ProductResolved[] = [
    { id: randomUUID(), name: 'Mleko' },
    { id: randomUUID(), name: 'Chleb' },
    { id: randomUUID(), name: 'Ciasto Francuskie' },
];

class ProductDAO implements DAO<ProductResolved> {
    public queryItems = async () => {
        return products;
    };

    public queryItem = async (id: string) => {
        return products.find(item => item.id === id);
    };

    public addItem = async (product: ProductResolved) => {
        products.push(product);
        return product;
    }

    public removeItem = async (id: UUID) => {
        const index = products.findIndex(product => product.id === id);
        const deletedProduct = products.splice(index, 1);
        return !!deletedProduct.at(0);
    }

    public amendItem = async (id: UUID, productToUpdate: ProductResolved) => {
        const product = products.find(product => product.id === id);
        if (product) {
            if (productToUpdate.id) {
                product.id = productToUpdate.id;
            }
            product.name = productToUpdate.name;
            return product;
        }
    }
}

export const productDAO = new ProductDAO();
