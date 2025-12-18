import { Router } from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateStock
} from '../controllers/productController';
import {
    validateCreateProduct,
    validateUpdateProduct,
    validateUpdateStock
} from '../middlewares/validation';

const router = Router();

router.post('/', validateCreateProduct, createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', validateUpdateProduct, updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id/stock', validateUpdateStock, updateStock);

export default router;
