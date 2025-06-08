import { Request, Response, NextFunction } from 'express';
import { PostCartBody, GetCartParams, UpdateCartParams, UpdateCartBody, DeleteCartParams, CartBase, DeleteCartItemParams, UpdateCartItemParams, UpdateCartItemBody, PostCartItemBody, GetCartItemParams } from '../../../shared/types/cart';
import { HttpError } from '../middlewares/errorHandlerMiddleware';
import { cartDAO } from '../database/cartDAO';

export const getCarts = async (_request: Request, response: Response, next: NextFunction) => {
    const carts = await cartDAO.queryItems();
    try {
        response.json(carts);
    } catch (error) {
        next(error);
    }
};

export const getCart = async (
    request: Request<GetCartParams>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const cart = await cartDAO.queryItem(id);
    try {
        if (!cart) {
            throw new HttpError(404, `Cart with id=${id} not found.`);
        }
        response.json(cart);
    } catch (error) {
        next(error);
    }
};

export const createCart = async (
    request: Request<{}, {}, PostCartBody>,
    response: Response,
    next: NextFunction
) => {
    try {
        const cartToAdd: CartBase = {
            ...request.body
        };
        const addedCart = await cartDAO.addItem(cartToAdd);
        response.status(201).json(addedCart);
    } catch (error) {
        next(error);
    }
};

export const deleteCart = async (
    request: Request<DeleteCartParams>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const deleteWasSuccessful = await cartDAO.removeItem(id);
    try {
        if (!deleteWasSuccessful) {
            throw new HttpError(404, `Cart with id=${id} not found.`);
        }
        response.json({ success: deleteWasSuccessful });
    } catch (error) {
        next(error);
    }
};

export const updateCart = async (
    request: Request<UpdateCartParams, {}, UpdateCartBody>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const newCartPayload = request.body;
    try {
        const amendedCart = await cartDAO.amendItem(id, newCartPayload);
        if (!amendedCart) {
            throw new HttpError(404, `Cart with id=${id} not found.`);
        }
        response.json(amendedCart);
    } catch (error) {
        next(error);
    }
}
