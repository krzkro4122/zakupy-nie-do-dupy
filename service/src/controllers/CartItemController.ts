import { cartItemDAO } from "../database/cartDAO";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../middlewares/errorHandlerMiddleware";
import { GetCartItemParams, PostCartItemBody, UpdateCartItemParams, UpdateCartItemBody, DeleteCartItemParams } from "../../../shared/types/cart";


// TODO
// Validate cartId
// Get names of products
// Parametrize by cartId
// Get cartId from params

export const getCartItems = async (_request: Request, response: Response, next: NextFunction) => {
    const cartItems = await cartItemDAO.queryItems();
    try {
        response.json(cartItems);
    } catch (error) {
        next(error);
    }
}

export const getCartItem = async (
    request: Request<GetCartItemParams>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const cartItem = await cartItemDAO.queryItem(id);
    try {
        if (!cartItem) {
            throw new HttpError(404, `Cart item with id=${id} not found.`);
        }
        response.json(cartItem);
    } catch (error) {
        next(error);
    }
}

export const addCartItem = async (
    request: Request<{}, {}, PostCartItemBody>,
    response: Response,
    next: NextFunction
) => {
    const newCartItemPayload = request.body;
    try {
        const addedCartItem = await cartItemDAO.addItem(newCartItemPayload);
        response.status(201).json(addedCartItem);
    } catch (error) {
        next(error);
    }
}

export const deleteCartItem = async (
    request: Request<DeleteCartItemParams>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const deleteWasSuccessful = await cartItemDAO.removeItem(id);
    try {
        if (!deleteWasSuccessful) {
            throw new HttpError(404, `Cart item with id=${id} not found.`);
        }
        response.json({ success: deleteWasSuccessful });
    } catch (error) {
        next(error);
    }
}

export const updateCartItem = async (
    request: Request<UpdateCartItemParams, {}, UpdateCartItemBody>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const newCartItemPayload = request.body;
    try {
        const amendedCartItem = await cartItemDAO.amendItem(id, newCartItemPayload);
        if (!amendedCartItem) {
            throw new HttpError(404, `Cart item with id=${id} not found.`);
        }
        response.json(amendedCartItem);
    } catch (error) {
        next(error);
    }
}