import {Router} from 'express';
import {  loginUser, newUser, getUsers, updateUser, deleteUser, getUser } from '../controllers/user';
import validateToken from './validate-token';
const router = Router();
router.post('/', newUser);
router.get('/lista', getUsers);
router.post('/login', loginUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.get('/:id',getUser);
export default router;