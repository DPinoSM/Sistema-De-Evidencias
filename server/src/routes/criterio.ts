import {Router} from 'express';
import {getCriterio, newCriterio, getOneCriterio,deleteCriterio, updateCriterio} from '../controllers/criterio';
// import validateToken from './validate-token';
const router = Router();
router.get('/lista',getCriterio);
router.post('/',newCriterio);
router.get('/:id',getOneCriterio);
router.delete('/:id',deleteCriterio);
router.put('/:id',updateCriterio);
export default router;