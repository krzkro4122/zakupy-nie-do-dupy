import { ProductBase, ProductResolved } from '../../../shared/types/product';
import { DAO } from './DAO';


class ProductDAO extends DAO<ProductResolved, ProductBase> { }

export const productDAO = new ProductDAO('products');
