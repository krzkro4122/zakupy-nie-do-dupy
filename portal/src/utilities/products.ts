import type { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import type { ProductResolved } from "../../../shared/types/product";
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
        console.log('products', response.data);

        const products: ProductResolved[] = response.data;
        return products;
    } catch (err) {
        console.log(err);
    }
};
