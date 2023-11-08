import { Router } from 'express';
import { loginUser, newUser, getUsers, updateUser, deleteUser, getUser, buscarUsuario  } from '../controllers/user';

const router = Router();

router.post('/', newUser);
router.get('/lista', getUsers);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUser);
router.get('/buscar', buscarUsuario);
export default router;
