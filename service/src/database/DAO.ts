import { UUID } from "crypto";
import { pbConnection } from "../config/config";
import { IDAO } from "../types/dao";

export class DAO<T, BaseT> implements IDAO<T, BaseT> {
    private collectionName;

    constructor (collectionName: string) {
        this.collectionName = collectionName;
    }

    public queryItems = async () => {
        try {
            const records = await pbConnection.collection(this.collectionName).getFullList();
            return records as unknown as T[];
        } catch (e) {
            console.log(`Failed to query items from: ${this.collectionName}`, e);
            return [];
        }
    };

    public queryItem = async (id: UUID) => {
        try {
            const record = await pbConnection.collection(this.collectionName).getFirstListItem(`id="${id}"`);
            return record as unknown as T;
        } catch (e) {
            console.log(`Failed to query item id=${id} from: ${this.collectionName}`, e);
        }
    };

    public addItem = async (item: BaseT) => {
        try {
            const record = await pbConnection.collection(this.collectionName).create(item);
            return record as unknown as T;
        } catch (e) {
            console.log(`Failed to add a new record to: ${this.collectionName}`, e, item);
        }
    };

    public removeItem = async (id: UUID) => {
        try {
            return await pbConnection.collection(this.collectionName).delete(`${id}`);
        } catch (e) {
            console.log(`Failed to remove a record id=${id} to: ${this.collectionName}`, e);
        }
    };

    public amendItem = async (id: UUID, newItemPayload: BaseT) => {
        try {
            const updatedRecord = await pbConnection.collection(this.collectionName).update(`${id}`, newItemPayload);
        return updatedRecord as unknown as T;
        } catch (e) {
            console.log(`Failed to update record ${id} to: ${this.collectionName}`, e, newItemPayload);
        }
    };
}
