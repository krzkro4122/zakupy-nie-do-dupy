import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types'; // Import the custom error type

// Custom Error class (optional, but good for structured errors)
export class HttpError extends Error implements ApiError {
  statusCode: number;
  details?: any;

  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, HttpError.prototype); // Correct prototype chain
  }
}

export const errorHandler = (err: Error | HttpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = (err as HttpError).statusCode || 500;
  const message = err.message || 'An unexpected error occurred.';

  console.error(`[ERROR] ${statusCode}: ${message}`, err); // Log the error for debugging

  const errorResponse: ApiError = {
      statusCode,
      message,
      details: (err as HttpError).details // Include details if available
  }

  res.status(statusCode).json(errorResponse);
};
