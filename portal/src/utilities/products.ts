import type { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import type { ProductBase, ProductResolved } from "../../../shared/types/product";
import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const fetchProducts = async () => {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } as RawAxiosRequestHeaders,
    };
    try {
        const response: AxiosResponse = await client.get(`/products`, config);
        const products: ProductResolved[] = response.data;
        return products;
    } catch (err) {
        console.log(err);
    }
};

export const postProduct = async (product: ProductBase) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } as RawAxiosRequestHeaders,
    };
    try {
        const response: AxiosResponse = await client.post(`/products`, product, config);
        const newProduct: ProductResolved = response.data;
        return newProduct;
    } catch (err) {
        console.log(err);
    }
};
