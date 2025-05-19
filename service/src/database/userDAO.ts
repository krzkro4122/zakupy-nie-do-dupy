import { UserResolved } from '../types/user';
import { config, pbConnection } from '../config/config';
import { DAO } from '../types/dao';
import { UUID } from 'crypto';

class UserDAO implements DAO<UserResolved> {
    public queryItems = async () => {
        const records = await pbConnection.collection('users').getFullList();
        return records as unknown as UserResolved[];
    };

    public queryItem = async (id: UUID) => {
        const record = await pbConnection.collection('users').getFirstListItem(`id="${id}"`);
        return record as unknown as UserResolved;
    };

    public addItem = async (item: UserResolved) => {
        const record = await pbConnection.collection('users').create(item);
        return record as unknown as UserResolved;
    };

    public removeItem = async (id: UUID) => {
        return await pbConnection.collection('users').delete(`${id}`);
    };

    public amendItem = async (id: UUID, newItemPayload: UserResolved) => {
        const updatedRecord = await pbConnection.collection('users').update('RECORD_ID', newItemPayload);
        return updatedRecord as unknown as UserResolved;
    };
}

export const userDAO = new UserDAO();
