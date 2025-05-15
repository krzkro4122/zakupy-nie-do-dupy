import { UUID } from "crypto";

export interface Product {
    id: UUID;
    name: string;
}

export interface GetProductParams {
    id: UUID;
}

export interface CreateProductBody {
    name: string;
}

export interface DeleteProductParams {
    id: UUID;
}
