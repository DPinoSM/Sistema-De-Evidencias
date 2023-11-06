//JONATHAN MOLINA 
//ROUTES DEBILIDADES
import { Router } from "express";
import { getDebilidades,newDebilidades,getOneDebilidades,deleteDebilidades,updateDebilidades } from "../controllers/debilidades";
// import validateToken from './validate-token';

const router = Router();
router.get('/lista',getDebilidades);
router.post('/',newDebilidades);
router.get('/:id',getOneDebilidades);
router.delete('/:id',deleteDebilidades);
router.put('/:id',updateDebilidades);
export default router;

//FIN