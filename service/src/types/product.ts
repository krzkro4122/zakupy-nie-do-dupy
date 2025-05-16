import { Identifiable } from "./common";

export interface ProductBase {
    name: string;
}

export interface ProductResolved extends ProductBase, Identifiable { }

export interface GetProductParams extends Identifiable { }
export interface DeleteProductParams extends Identifiable { }
export interface UpdateProductParams extends Identifiable { }
export interface UpdateProductBody extends ProductResolved { }
export interface PostProductBody extends ProductBase { }
