import { Router } from 'express';
import { getProducts, getProduct, createProduct, deleteProduct, updateProduct } from '../controllers/productController';

export const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);
productRouter.post('/', createProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.put('/:id', updateProduct);
