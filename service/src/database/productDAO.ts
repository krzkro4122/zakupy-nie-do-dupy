import { ProductResolved } from '../types/product';
import { config, pbConnection } from '../config/config';
import { DAO } from '../types/dao';
import { UUID } from 'crypto';

class ProductDAO implements DAO<ProductResolved> {
    public queryItems = async () => {
        const records = await pbConnection.collection('users').getFullList();
        return records as unknown as ProductResolved[];
    };

    public queryItem = async (id: UUID) => {
        const record = await pbConnection.collection('users').getFirstListItem(`id="${id}"`);
        return record as unknown as ProductResolved;
    };

    public addItem = async (item: ProductResolved) => {
        const record = await pbConnection.collection('users').create(item);
        return record as unknown as ProductResolved;
    };

    public removeItem = async (id: UUID) => {
        return await pbConnection.collection('users').delete(`${id}`);
    };

    public amendItem = async (id: UUID, newItemPayload: ProductResolved) => {
        const updatedRecord = await pbConnection.collection('users').update('RECORD_ID', newItemPayload);
        return updatedRecord as unknown as ProductResolved;
    };
}

export const productDAO = new ProductDAO();
