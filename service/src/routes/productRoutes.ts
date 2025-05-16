import { Router } from 'express';
import { getProducts, getProduct, createProduct, deleteProduct, updateProduct } from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
