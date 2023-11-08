import {Router} from 'express';
import {getFacultades, newFacultad, getFacultad, deleteFacultad, updateFacultad, buscarFacultad} from '../controllers/facultad';
// import validateToken from './validate-token';
const router = Router();
router.get('/lista',getFacultades);
router.post('/',newFacultad);
router.get('/:id',getFacultad);
router.delete('/:id',deleteFacultad);
router.put('/:id',updateFacultad);
router.get('/buscar',buscarFacultad);
export default router;