import {Router} from 'express';
import {getCarreras, newCarrera, getCarrera, deleteCarrera, updateCarrera} from '../controllers/carrera';
import validateToken from './validate-token';
const router = Router();
router.get('/lista',validateToken, getCarreras);
router.post('/',validateToken, newCarrera);
router.get('/:id',validateToken, getCarrera);
router.delete('/:id',validateToken, deleteCarrera);
router.put('/:id',validateToken, updateCarrera);
export default router;