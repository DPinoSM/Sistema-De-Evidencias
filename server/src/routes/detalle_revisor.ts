//JONATHAN MOLINA 
//ROUTES DETALLE REVISOR
import {Router} from 'express';
import {getDetalle_Revisor, newDetalle_Revisor, getOneDetalle_Revisor,deleteDetalle_Revisor, updateDetalle_Revisor} from '../controllers/detalle_revisor';
import validateToken from './validate-token';
const router = Router();
router.get('/lista',validateToken, getDetalle_Revisor);
router.post('/',validateToken, newDetalle_Revisor);
router.get('/:id',validateToken, getOneDetalle_Revisor);
router.delete('/:id',validateToken, deleteDetalle_Revisor);
router.put('/:id',validateToken, updateDetalle_Revisor);
export default router;

//FIN