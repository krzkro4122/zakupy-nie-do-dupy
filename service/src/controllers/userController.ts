import { Request, Response, NextFunction } from 'express';
import { UpdateUserBody, UpdateUserParams, UserResolved, DeleteUserParams, GetUserParams, PostUserBody } from '../../../shared/types/user';
import { HttpError } from '../middlewares/errorHandlerMiddleware';
import { userDAO } from '../database/userDAO';

export const getUsers = async (request: Request, response: Response, next: NextFunction) => {
    const users = await userDAO.queryItems();
    try {
        response.json(users);
    } catch (error) {
        next(error);
    }
};

export const getUser = async (
    request: Request<GetUserParams>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const user = await userDAO.queryItem(id);
    try {
        if (!user) {
            throw new HttpError(404, `User with id=${id} not found.`);
        }
        response.json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (
    request: Request<DeleteUserParams>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const deleteWasSuccessful = await userDAO.removeItem(id);
    try {
        if (!deleteWasSuccessful) {
            throw new HttpError(404, `User with id=${id} not found.`);
        }
        response.json({ success: deleteWasSuccessful });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (
    request: Request<UpdateUserParams, {}, UpdateUserBody>,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;
    const newUserPayload = request.body;
    try {
        const amendedUser = await userDAO.amendItem(id, newUserPayload);
        if (!amendedUser) {
            throw new HttpError(404, `User with id=${id} not found.`);
        }
        response.json(amendedUser);
    } catch (error) {
        next(error);
    }
}
