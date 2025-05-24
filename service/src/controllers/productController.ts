import { Request, Response, NextFunction } from 'express';
import { PostProductBody, GetProductParams, ProductResolved, UpdateProductParams, UpdateProductBody, DeleteProductParams, ProductBase } from '../../../shared/types/product';
import { HttpError } from '../middlewares/errorHandlerMiddleware';
import { randomUUID } from 'crypto';
import { productDAO } from '../database/productDAO';

export const getProducts = async (request: Request, response: Response, next: NextFunction) => {
    const products = await productDAO.queryItems();
    try {
        response.json(products);
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (
    request: Request<GetProductParams>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const product = await productDAO.queryItem(id);
    try {
        if (!product) {
            throw new HttpError(404, `Product with id=${id} not found.`);
        }
        response.json(product);
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (
    request: Request<{}, {}, PostProductBody>,
    response: Response,
    next: NextFunction
) => {
    try {
        const productToAdd: ProductBase = {
            ...request.body
        };
        const addedProduct = await productDAO.addItem(productToAdd);
        response.status(201).json(addedProduct);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (
    request: Request<DeleteProductParams>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const deleteWasSuccessful = await productDAO.removeItem(id);
    try {
        if (!deleteWasSuccessful) {
            throw new HttpError(404, `Product with id=${id} not found.`);
        }
        response.json({ success: deleteWasSuccessful });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (
    request: Request<UpdateProductParams, {}, UpdateProductBody>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const newProductPayload = request.body;
    try {
        const amendedProduct = await productDAO.amendItem(id, newProductPayload);
        if (!amendedProduct) {
            throw new HttpError(404, `Product with id=${id} not found.`);
        }
        response.json(amendedProduct);
    } catch (error) {
        next(error);
    }
}
