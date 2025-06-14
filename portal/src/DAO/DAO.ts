import { Config } from "../utilities/config";
import type { IDAO } from "../types/dao";
import { ClientResponseError } from "pocketbase";
const pbConnection = Config.getPbConnection();

export class DAO<T extends {}, BaseT extends {}> implements IDAO<T, BaseT> {
    private collectionName;

    constructor (collectionName: string) {
        this.collectionName = collectionName;
    }

    public queryItems = async (relationToExpand: string = '') => {
        try {
            const records = await pbConnection.collection(this.collectionName).getFullList({
                expand: relationToExpand,
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

    public queryItem = async (id: string, relationToExpand: string = '') => {
        try {
            const record = await pbConnection.collection(this.collectionName).getFirstListItem(`id="${id}"`, {
                expand: relationToExpand,
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

    public addItem = async (item: BaseT, relationToExpand: string = '') => {
        try {
            const record = await pbConnection.collection(this.collectionName).create(item, {
                expand: relationToExpand,
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

    public removeItem = async (id: string) => {
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

    public amendItem = async (id: string, newItemPayload: BaseT, relationToExpand: string = '') => {
        try {
            const updatedRecord = await pbConnection.collection(this.collectionName).update(`${id}`, newItemPayload, {
                expand: relationToExpand,
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
