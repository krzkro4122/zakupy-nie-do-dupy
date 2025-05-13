import { Request, Response, NextFunction } from 'express';
import { CreateShoppingListItemBody, GetShoppingListItemParams, ShoppingListItem } from '../types';
import { HttpError } from '../middlewares/errorHandler';

// In-memory data store (replace with your database logic)
let shoppingListItems: ShoppingListItem[] = [
  { id: '1', name: 'Milk', quantity: 1, purchased: false },
  { id: '2', name: 'Bread', quantity: 2, purchased: true },
];

// Helper to find item by ID
const findItemById = (id: string): ShoppingListItem | undefined => {
  return shoppingListItems.find(item => item.id === id);
};

export const getShoppingList = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(shoppingListItems);
  } catch (error) {
    next(error); // Pass errors to the error handling middleware
  }
};

export const getShoppingListItem = (
  req: Request<GetShoppingListItemParams>, // Type the request params
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const item = findItemById(id);

    if (!item) {
      throw new HttpError(404, `Item with id ${id} not found.`);
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const createShoppingListItem = (
  req: Request<{}, {}, CreateShoppingListItemBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, quantity = 1 } = req.body; // Provide a default for quantity

    if (!name) {
      throw new HttpError(400, 'Item name is required.');
    }

    const newItem: ShoppingListItem = {
      id: Date.now().toString(), // Simple unique ID (use a proper UUID in production)
      name,
      quantity,
      purchased: false,
    };

    shoppingListItems.push(newItem);

    res.status(201).json(newItem); // Use 201 for resource creation
  } catch (error) {
    next(error);
  }
};
