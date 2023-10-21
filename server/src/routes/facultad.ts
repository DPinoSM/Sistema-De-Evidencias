import {Router} from 'express';
import {getFacultades, newFacultad, getFacultad, deleteFacultad, updateFacultad} from '../controllers/facultad';
// import validateToken from './validate-token';
const router = Router();
router.get('/lista',getFacultades);
router.post('/',newFacultad);
router.get('/:id',getFacultad);
router.delete('/:id',deleteFacultad);
router.put('/:id',updateFacultad);
export default router;