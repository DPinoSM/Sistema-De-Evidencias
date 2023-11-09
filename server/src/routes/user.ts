import { Router } from 'express';
import { loginUser, newUser, getUsers, updateUser, deleteUser, getUser, buscarUsuario  } from '../controllers/user';
import validateToken from './validate-token';
const router = Router();

router.post('/', validateToken, newUser);
router.get('/lista', validateToken, getUsers);
router.post('/login', loginUser);
router.put('/:id', validateToken, updateUser);
router.delete('/:id',validateToken,  deleteUser);
router.get('/:id', validateToken, getUser);
router.get('/buscar',validateToken, buscarUsuario);
export default router;
