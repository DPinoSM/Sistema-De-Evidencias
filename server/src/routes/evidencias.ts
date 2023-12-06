import { Router } from 'express';
import { getEvidencias, newEvidencia, getEvidencia, deleteEvidencia, updateEvidencia, buscarEvidencia, generarPDF, getEvidenciasByUsuario } from '../controllers/evidencias';
import validateToken from './validate-token';
const router = Router();
router.get('/lista',getEvidencias);
router.post('/', newEvidencia);
router.get('/:id',getEvidencia);
router.delete('/:id',deleteEvidencia);
router.put('/:id', updateEvidencia);
router.get('/buscar', buscarEvidencia); 
router.get('/pdf/:id', generarPDF);
router.get('/usuario/:id_usuario',getEvidenciasByUsuario);

export default router;