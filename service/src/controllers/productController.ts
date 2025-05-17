import { Request, Response, NextFunction } from 'express';
import { PostProductBody, GetProductParams, ProductResolved, UpdateProductParams, UpdateProductBody, DeleteProductParams } from '../types/product';
import { HttpError } from '../middlewares/errorHandlerMiddleware';
import { randomUUID } from 'crypto';
import { addProduct, amendProduct, queryProductById, queryProducts, removeProduct } from '../database/inMemory';

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
    try {
        if (!product) {
            throw new HttpError(404, `Product with id=${id} not found.`);
        }
        response.json(product);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = (
    request: Request<DeleteProductParams>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const removedProduct = removeProduct(id);
    try {
        if (!removedProduct) {
            throw new HttpError(404, `Product with id=${id} not found.`);
        }
        response.json(removedProduct);
    } catch (error) {
        next(error);
    }
};

export const createProduct = (
    request: Request<{}, {}, PostProductBody>,
    response: Response,
    next: NextFunction
) => {
    const { name } = request.body;
    try {
        if (!name) {
            throw new HttpError(400, 'Item name is required.');
        }
        const productToAdd: ProductResolved = {
            id: randomUUID(),
            name,
        };
        const addedProduct = addProduct(productToAdd);
        response.status(201).json(addedProduct);
    } catch (error) {
        next(error);
    }
};

export const updateProduct = (
    request: Request<UpdateProductParams, {}, UpdateProductBody>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const newProductPayload = request.body;
    try {
        const amendedProduct = amendProduct(id, newProductPayload);
        if (!amendedProduct) {
            throw new HttpError(404, `Product with id=${id} not found.`);
        }
        response.json(amendedProduct);
    } catch (error) {
        next(error);
    }
}
