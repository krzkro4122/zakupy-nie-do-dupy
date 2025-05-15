import { Request, Response, NextFunction } from 'express';
import { CreateProductBody, GetProductParams, Product } from '../types/product';
import { HttpError } from '../middlewares/errorHandler';
import { randomUUID } from 'crypto';
import { queryProductById, queryProducts } from '../database/local';

export const getProducts = (request: Request, response: Response, next: NextFunction) => {
    const products = queryProducts();
    try {
        response.json(products);
    } catch (error) {
        next(error);
    }
};

export const getProduct = (
    request: Request<GetProductParams>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const product = queryProductById(id);
    if (!product) {
        throw new HttpError(404, `Item with id ${id} not found.`);
    }
    try {
        response.json(product);
    } catch (error) {
        next(error);
    }
};

export const createProduct = (
    request: Request<{}, {}, CreateProductBody>,
    response: Response,
    next: NextFunction
) => {
    try {
        const { name, quantity = 1 } = request.body;

        if (!name) {
            throw new HttpError(400, 'Item name is required.');
        }

        const newItem: Product = {
            id: randomUUID(),
            name,
            quantity,
            purchased: false,
        };

        products.push(newItem);

        response.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = (
    request: Request<{}, {}, CreateProductBody>,
    response: Response,
    next: NextFunction
) => {
    try {
        const { name } = request.body;

        if (!name) {
            throw new HttpError(400, 'Item name is required.');
        }

        const newItem: Product = {
            id: randomUUID(),
            name,
        };

        products.push(newItem);

        response.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};
