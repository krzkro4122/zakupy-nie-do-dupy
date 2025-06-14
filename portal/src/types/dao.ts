export interface IDAO<T, BaseT> {
    queryItems: () => Promise<T[]>;
    queryItem: (id: string) => Promise<T | undefined>;
    addItem: (item: BaseT) => Promise<T | undefined>;
    removeItem: (id: string) => Promise<boolean>;
    amendItem: (id: string, newItemPayload: BaseT) => Promise<T | undefined>;
}
