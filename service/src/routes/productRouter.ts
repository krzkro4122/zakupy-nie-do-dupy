import { Router } from 'express';
import { getProducts, getProduct, createProduct, deleteProduct, updateProduct } from '../controllers/productController';

export const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.post('/', createProduct);
productRouter.get('/:id', getProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);
