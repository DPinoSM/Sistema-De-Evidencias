import { Router } from "express";
import {getDetalle_DAC, newDetalle_DAC,getOneDetalle_DAC,deleteDetalle_DAC, updateDetalle_DAC} from '../controllers/detalle_dac'
//import validateToken from './validate-token';
const router= Router();
router.get('/lista', getDetalle_DAC);
router.post('/',newDetalle_DAC);
router.get('/:id',getOneDetalle_DAC);
router.delete('/:id',deleteDetalle_DAC);
router.put('/:id',updateDetalle_DAC);
export default router;