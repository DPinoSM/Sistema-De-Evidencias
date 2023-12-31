import {Router} from 'express';
import {getRegistro, newRegistro, getOneRegistro,deleteRegistro, updateRegistro, buscarRegistro} from '../controllers/registro';
import validateToken from './validate-token';
const router = Router();
router.get('/lista', validateToken, getRegistro);
router.post('/',validateToken, newRegistro);
router.get('/:id',validateToken, getOneRegistro);
router.delete('/:id',validateToken, deleteRegistro);
router.put('/:id',validateToken, updateRegistro);
router.get('/buscar',validateToken, buscarRegistro);
export default router;