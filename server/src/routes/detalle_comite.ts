import { Router } from "express";
import {getDetalle_Comite, newDetalle_Comite,getOneDetalle_Comite,deleteDetalle_Comite, updateDetalle_Comite} from '../controllers/detalle_comite'
import validateToken from './validate-token';
const router= Router();
router.get('/lista',validateToken,  getDetalle_Comite);
router.post('/',validateToken, newDetalle_Comite);
router.get('/:id',validateToken, getOneDetalle_Comite);
router.delete('/:id',validateToken, deleteDetalle_Comite);
router.put('/:id',validateToken, updateDetalle_Comite);
export default router;