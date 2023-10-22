import {Router} from 'express';
import {getCarreras, newCarrera, getCarrera, deleteCarrera, updateCarrera} from '../controllers/carrera';
// import validateToken from './validate-token';
const router = Router();
router.get('/lista',getCarreras);
router.post('/',newCarrera);
router.get('/:id',getCarrera);
router.delete('/:id',deleteCarrera);
router.put('/:id',updateCarrera);
export default router;