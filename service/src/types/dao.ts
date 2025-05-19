import { UUID } from "crypto";

export interface DAO<T> {
    queryItems: () => Promise<T[]>;
    queryItem: (id: UUID) => Promise<T | undefined>;
    addItem: (item: T) => Promise<T>;
    removeItem: (id: UUID) => Promise<boolean>;
    amendItem: (id: UUID, newItemPayload: T) => Promise<T | undefined>;
}