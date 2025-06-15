import { type UserTracked, type Identifiable, type TimeTracked, type Id } from "./common";
import type { ProductResolved } from "./product";
import type { UserResolved } from "./user";

export interface CartBase extends UserTracked {
    isBought: boolean;
}

export interface CartResolved extends CartBase, Identifiable, TimeTracked {
    expand: {
        user: UserResolved;
    };
}

export interface GetCartParams extends Identifiable { }

export interface DeleteCartParams extends Identifiable { }

export interface UpdateCartParams extends Identifiable { }

export interface UpdateCartBody extends CartResolved { }

export interface PostCartBody extends CartBase { }


export interface CartItemBase {
    quantity: number;
    isBought: boolean;
    unit?: string;
    product: Id;
    cart: Id;
}

export interface CartItemResolved extends CartItemBase, Identifiable, TimeTracked {
    expand: {
        cart: CartResolved;
        product: ProductResolved;
    };
}

export interface GetCartItemParams extends Identifiable { }

export interface DeleteCartItemParams extends Identifiable { }

export interface UpdateCartItemParams extends Identifiable { }

export interface UpdateCartItemBody extends CartItemResolved { }

export interface PostCartItemBody extends CartItemBase { }
