//JONATHAN MOLINA 
//ROUTES DETALLE REVISOR
import {Router} from 'express';
import {getDetalle_Revisor, newDetalle_Revisor, getOneDetalle_Revisor,deleteDetalle_Revisor, updateDetalle_Revisor} from '../controllers/detalle_revisor';
// import validateToken from './validate-token';
const router = Router();
router.get('/lista',getDetalle_Revisor);
router.post('/',newDetalle_Revisor);
router.get('/:id',getOneDetalle_Revisor);
router.delete('/:id',deleteDetalle_Revisor);
router.put('/:id',updateDetalle_Revisor);
export default router;

//FIN