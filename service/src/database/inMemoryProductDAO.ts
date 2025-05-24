import { randomUUID, UUID } from "crypto";
import { ProductBase, ProductResolved } from "../../../shared/types/product";
import { DAO } from "./DAO";

const products: ProductResolved[] = [
    {
        id: randomUUID(), name: 'Mleko',
        created: "",
        updated: ""
    },
    {
        id: randomUUID(), name: 'Chleb',
        created: "",
        updated: ""
    },
    {
        id: randomUUID(), name: 'Ciasto Francuskie',
        created: "",
        updated: ""
    },
];

class ProductDAO extends DAO<ProductResolved, ProductBase> {

    public queryItems = async () => {
        return products;
    };

    public queryItem = async (id: string) => {
        return products.find(item => item.id === id);
    };

    public addItem = async (product: ProductBase) => {
        const newProduct: ProductResolved = {
            ...product,
            created: "",
            updated: "",
            id: randomUUID()
        }
        products.push(newProduct);
        return newProduct;
    }

    public removeItem = async (id: UUID) => {
        const index = products.findIndex(product => product.id === id);
        const deletedProduct = products.splice(index, 1);
        return !!deletedProduct.at(0);
    }

    public amendItem = async (id: UUID, productToUpdate: ProductBase) => {
        const product = products.find(product => product.id === id);
        if (product) {
            product.name = productToUpdate.name;
            return product;
        }
    }
}

export const productDAO = new ProductDAO('fakeProducts');
