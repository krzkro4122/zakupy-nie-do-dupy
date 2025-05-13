// Define common types used throughout your API
export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
}

// Example request body type for creating an item
export interface CreateShoppingListItemBody {
  name: string;
  quantity?: number; // Optional
}

// Example request parameters type
export interface GetShoppingListItemParams {
  id: string;
}

// Define a custom error structure if needed
export interface ApiError {
  statusCode: number;
  message: string;
  details?: any;
}
