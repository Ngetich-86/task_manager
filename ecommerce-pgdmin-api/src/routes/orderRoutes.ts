import { Router } from 'express';
import {
    createOrder,
    getOrders,
    getOrderById,
    getUserOrders,
    updateOrderStatus,
    deleteOrder
} from '../controllers/orderController';
import {
    validateCreateOrder,
    validateUpdateOrderStatus
} from '../middlewares/validation';

const router = Router();

router.post('/', validateCreateOrder, createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.get('/user/:userId', getUserOrders);
router.patch('/:id/status', validateUpdateOrderStatus, updateOrderStatus);
router.delete('/:id', deleteOrder);

export default router;
