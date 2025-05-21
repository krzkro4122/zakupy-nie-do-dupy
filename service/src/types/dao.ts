import { UUID } from "crypto";

export interface IDAO<T, BaseT> {
    queryItems: () => Promise<T[]>;
    queryItem: (id: UUID) => Promise<T | undefined>;
    addItem: (item: BaseT) => Promise<T | undefined>;
    removeItem: (id: UUID) => Promise<boolean>;
    amendItem: (id: UUID, newItemPayload: BaseT) => Promise<T | undefined>;
}
