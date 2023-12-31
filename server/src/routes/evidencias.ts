import { Router } from 'express';
import { getEvidencias, newEvidencia, getEvidencia, deleteEvidencia, updateEvidencia, buscarEvidencia, generarPDF, getEvidenciasByUsuario, filtrarEvidenciasPorAprobacion, actualizarRevisor, actualizarDac, actualizarComite} from '../controllers/evidencias';
import validateToken from './validate-token';
const router = Router();
router.get('/lista',getEvidencias);
router.post('/', newEvidencia);
router.get('/:id',getEvidencia);
router.delete('/:id',deleteEvidencia);
router.put('/:id', updateEvidencia);
router.get('/buscar', validateToken, buscarEvidencia); 
router.get('/pdf/:id',generarPDF);
router.get('/usuario/:id_usuario', getEvidenciasByUsuario);
router.get('/clasificar-evidencias/:estado/:id_usuario', filtrarEvidenciasPorAprobacion);
router.put('/revisado-revisor/:id', actualizarRevisor);
router.put('/revisado-dac/:id', actualizarDac);
router.put('/revisado-comite/:id', actualizarComite);
export default router;