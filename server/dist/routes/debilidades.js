"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//JONATHAN MOLINA 
//ROUTES DEBILIDADES
const express_1 = require("express");
const debilidades_1 = require("../controllers/debilidades");
// import validateToken from './validate-token';
const router = (0, express_1.Router)();
router.get('/lista', debilidades_1.getDebilidades);
router.post('/', debilidades_1.newDebilidades);
router.get('/:id', debilidades_1.getOneDebilidades);
router.delete('/:id', debilidades_1.deleteDebilidades);
router.put('/:id', debilidades_1.updateDebilidades);
exports.default = router;
//FIN
