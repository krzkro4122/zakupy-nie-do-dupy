export interface User {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
}

export interface CreateShoppingListItemBody {
  name: string;
  quantity?: number; // Optional
}

export interface GetShoppingListItemParams {
  id: string;
}
