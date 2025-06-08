import type { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import axios from "axios";
import { Config } from "./config";

const client = axios.create({
    baseURL: Config.getApiUrl(),
});

export const fetchAllItems = async <T>(path: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } as RawAxiosRequestHeaders,
    };
    try {
        const response: AxiosResponse = await client.get(`/${path}`, config);
        const items: T[] = response.data;
        return items;
    } catch (err) {
        console.log(err);
    }
};

export const postItem = async <T, D>(path: string, item: T) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } as RawAxiosRequestHeaders,
    };
    try {
        const response: AxiosResponse = await client.post(`/${path}`, item, config);
        const newItem: D = response.data;
        return newItem;
    } catch (err) {
        console.log(err);
    }
};

export const deleteItem = async (path: string, id: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
        } as RawAxiosRequestHeaders,
    };
    try {
        const response: AxiosResponse = await client.delete(`/${path}/${id}`, config);
        return response.data.success === true;
    } catch (err) {
        console.log(err);
    }
};

export const updateItem = async <T, D>(path: string, id: string, updatedPayload: T) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
        } as RawAxiosRequestHeaders,
    };
    try {
        const response: AxiosResponse = await client.put(`/${path}/${id}`, updatedPayload, config);
        const updatedItem: D = response.data;
        return updatedItem;
    } catch (err) {
        console.log(err);
    }
};
