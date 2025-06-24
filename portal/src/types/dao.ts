import type { Id } from "./common";

export interface IDAO<T, BaseT> {
    queryItems: (filter?: string, sort?: string) => Promise<T[]>;
    queryItem: (id: Id) => Promise<T | undefined>;
    addItem: (item: BaseT) => Promise<T | undefined>;
    removeItem: (id: Id) => Promise<boolean>;
    amendItem: (id: Id, newItemPayload: BaseT) => Promise<T | undefined>;
}
