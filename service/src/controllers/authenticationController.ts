import { Request, Response, NextFunction } from 'express';
import { productDAO } from '../database/productDAO';
import { pbConnection } from '../config/config';

export const login = async (_request: Request, response: Response, next: NextFunction) => {
    try {
        const authData = await pbConnection.collection('users').authWithOAuth2({ provider: 'google' });
        console.log(pbConnection.authStore.isValid);
        console.log(pbConnection.authStore.token);
        console.log(pbConnection.authStore.record.id);
        response.json(authData);
    } catch (error) {
        next(error);
    }
};

export const logout = async (_request: Request, response: Response, next: NextFunction) => {
    const authData = await pbConnection.authStore.clear();
    try {
        response.json(authData);
    } catch (error) {
        next(error);
    }
};

export const register = async (_request: Request, response: Response, next: NextFunction) => {
    const products = await productDAO.queryItems();
    try {
        response.json(products);
    } catch (error) {
        next(error);
    }
};
