import {Router} from 'express';
import {getAmbitoGeografico, newAmbitoGeografico, getAmbitosGeograficos,deleteAmbitoGeografico, updateAmbitoGeografico, buscarAmbGeo} from '../controllers/ambito_geografico';
import validateToken from './validate-token';


const router = Router();
router.get('/lista',validateToken, getAmbitosGeograficos);
router.post('/',validateToken, newAmbitoGeografico);
router.get('/:id',validateToken, getAmbitoGeografico);
router.delete('/:id', validateToken, deleteAmbitoGeografico);
router.put('/:id',validateToken, updateAmbitoGeografico);
router.get('buscar', buscarAmbGeo);
export default router;