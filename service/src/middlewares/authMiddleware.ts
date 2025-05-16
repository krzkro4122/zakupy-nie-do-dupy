import { NextFunction, Request, Response } from "express";

export const authenticateUser = (request: Request, response: Response, next: NextFunction) => {
    console.log('Some1 is authing!', request);
};
