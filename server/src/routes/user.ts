import { Router } from 'express';
import { loginUser, newUser, getUsers, updateUser, deleteUser, getUser } from '../controllers/user';

const router = Router();

router.post('/', newUser);
router.get('/lista', getUsers);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUser);

export default router;
