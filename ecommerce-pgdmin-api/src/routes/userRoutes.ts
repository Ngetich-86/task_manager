import { Router } from 'express';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/userController';
import {
    validateCreateUser,
    validateUpdateUser
} from '../middlewares/validation';

const router = Router();

router.post('/', validateCreateUser, createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', validateUpdateUser, updateUser);
router.delete('/:id', deleteUser);

export default router;
