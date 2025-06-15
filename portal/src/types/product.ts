import { type UserTracked, type Identifiable, type TimeTracked } from "./common";
import type { UserResolved } from "./user";

export interface ProductBase extends UserTracked {
    name: string;
}

export interface ProductResolved extends ProductBase, Identifiable, TimeTracked {
    expand: {
        user: UserResolved;
    };
}

export interface GetProductParams extends Identifiable { }

export interface DeleteProductParams extends Identifiable { }

export interface UpdateProductParams extends Identifiable { }

export interface UpdateProductBody extends ProductResolved { }

export interface PostProductBody extends ProductBase { }
