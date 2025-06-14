import { type UserTracked, type Identifiable, type TimeTracked } from "./common";

export interface CartBase {
    isBought: boolean;
}

export interface CartResolved extends CartBase, Identifiable, TimeTracked, UserTracked { }

export interface GetCartParams extends Identifiable { }

export interface DeleteCartParams extends Identifiable { }

export interface UpdateCartParams extends Identifiable { }

export interface UpdateCartBody extends CartResolved { }

export interface PostCartBody extends CartBase { }


export interface CartItemBase {
    quantity: number;
    isBought: boolean;
    unit?: string;
    productId: string;
    cartId: string;
}

export interface CartItemResolved extends CartItemBase, Identifiable, TimeTracked {
    name: string;
 }

export interface GetCartItemParams extends Identifiable { }

export interface DeleteCartItemParams extends Identifiable { }

export interface UpdateCartItemParams extends Identifiable { }

export interface UpdateCartItemBody extends CartItemResolved { }

export interface PostCartItemBody extends CartItemBase { }
