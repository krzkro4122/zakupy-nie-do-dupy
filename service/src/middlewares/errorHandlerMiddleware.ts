import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types/error';

export class HttpError extends Error implements ApiError {
  statusCode: number;
  details?: any;

  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export const errorHandler = (error: Error | HttpError, request: Request, response: Response, next: NextFunction) => {
  const statusCode = (error as HttpError).statusCode || 500;
  const message = error.message || 'An unexpected error occurred.';

  console.error(`[ERROR] ${statusCode}: ${message}`, error);

  const errorResponse: ApiError = {
    statusCode,
    message,
    details: (error as HttpError).details
  }

  response.status(statusCode).json(errorResponse);
};
