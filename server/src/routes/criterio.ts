import {Router} from 'express';
import {getCriterio, newCriterio, getOneCriterio,deleteCriterio, updateCriterio} from '../controllers/criterio';
import validateToken from './validate-token';
const router = Router();
router.get('/lista',validateToken, getCriterio);
router.post('/',validateToken, newCriterio);
router.get('/:id',validateToken, getOneCriterio);
router.delete('/:id',validateToken, deleteCriterio);
router.put('/:id',validateToken, updateCriterio);
export default router;