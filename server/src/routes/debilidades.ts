//JONATHAN MOLINA 
//ROUTES DEBILIDADES
import { Router } from "express";
import { getDebilidades,newDebilidades,getOneDebilidades,deleteDebilidades,updateDebilidades } from "../controllers/debilidades";
import validateToken from './validate-token';

const router = Router();
router.get('/lista',validateToken, getDebilidades);
router.post('/',validateToken, newDebilidades);
router.get('/:id',validateToken, getOneDebilidades);
router.delete('/:id',validateToken, deleteDebilidades);
router.put('/:id',validateToken, updateDebilidades);
export default router;

//FIN