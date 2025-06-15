import type { ProductBase, ProductResolved } from '../types/product';
import { DAO } from './DAO';

class ProductDAO extends DAO<ProductResolved, ProductBase> { }

export const productDAO = new ProductDAO({collectionName: 'products', relationToExpand: 'user'});
