import { Config } from "../utilities/config";
import type { IDAO } from "../types/dao";
import { ClientResponseError } from "pocketbase";
import type { Id } from "../types/common";
const pbConnection = Config.getPbConnection();

export interface DAOParams {
    collectionName: string;
    relationToExpand: string;
}

export class DAO<T extends {}, BaseT extends {}> implements IDAO<T, BaseT> {
    private collectionName: string;
    private relationToExpand: string;

    constructor ({collectionName, relationToExpand}: DAOParams) {
        this.collectionName = collectionName;
        this.relationToExpand = relationToExpand;
    }

    public queryItems = async (filter?: string, sort?: string) => {
        try {
            const records = await pbConnection.collection(this.collectionName).getFullList({
                expand: this.relationToExpand,
                filter: filter,
                sort: sort,
            });
            return records as unknown as T[];
        } catch (e) {
            if (e instanceof ClientResponseError) {
                if (!e.isAbort) {
                    console.error(`Failed to query items from: ${this.collectionName}`, e);
                }
            }
            return [];
        }
    };

    public queryItem = async (id: Id) => {
        try {
            const record = await pbConnection.collection(this.collectionName).getFirstListItem(`id="${id}"`, {
                expand: this.relationToExpand,
            });
            return record as unknown as T;
        } catch (e) {
            if (e instanceof ClientResponseError) {
                if (!e.isAbort) {
                    console.error(`Failed to query item id=${id} from: ${this.collectionName}`, e);
                }
            }
        }
    };

    public addItem = async (item: BaseT) => {
        try {
            const record = await pbConnection.collection(this.collectionName).create(item, {
                expand: this.relationToExpand,
            });
            return record as unknown as T;
        } catch (e) {
            if (e instanceof ClientResponseError) {
                if (!e.isAbort) {
                    console.error(`Failed to add a new record to: ${this.collectionName}`, e, item);
                }
            }
        }
    };

    public removeItem = async (id: Id) => {
        try {
            return await pbConnection.collection(this.collectionName).delete(`${id}`);
        } catch (e) {
            if (e instanceof ClientResponseError) {
                if (!e.isAbort) {
                    console.error(`Failed to remove a record id=${id} to: ${this.collectionName}`, e);
                }
            }
            return false;
        }
    };

    public amendItem = async (id: Id, newItemPayload: BaseT) => {
        try {
            const updatedRecord = await pbConnection.collection(this.collectionName).update(`${id}`, newItemPayload, {
                expand: this.relationToExpand,
            });
        return updatedRecord as unknown as T;
        } catch (e) {
            if (e instanceof ClientResponseError) {
                if (!e.isAbort) {
                    console.error(`Failed to update record ${id} to: ${this.collectionName}`, e, newItemPayload);
                }
            }
        }
    };
}
