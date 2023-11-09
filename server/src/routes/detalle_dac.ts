import { Router } from "express";
import {getDetalle_DAC, newDetalle_DAC,getOneDetalle_DAC,deleteDetalle_DAC, updateDetalle_DAC} from '../controllers/detalle_dac'
import validateToken from './validate-token';
const router= Router();
router.get('/lista',validateToken,  getDetalle_DAC);
router.post('/',validateToken, newDetalle_DAC);
router.get('/:id',validateToken, getOneDetalle_DAC);
router.delete('/:id',validateToken, deleteDetalle_DAC);
router.put('/:id',validateToken, updateDetalle_DAC);
export default router;