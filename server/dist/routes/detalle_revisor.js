"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//JONATHAN MOLINA 
//ROUTES DETALLE REVISOR
const express_1 = require("express");
const detalle_revisor_1 = require("../controllers/detalle_revisor");
// import validateToken from './validate-token';
const router = (0, express_1.Router)();
router.get('/lista', detalle_revisor_1.getDetalle_Revisor);
router.post('/', detalle_revisor_1.newDetalle_Revisor);
router.get('/:id', detalle_revisor_1.getOneDetalle_Revisor);
router.delete('/:id', detalle_revisor_1.deleteDetalle_Revisor);
router.put('/:id', detalle_revisor_1.updateDetalle_Revisor);
exports.default = router;
//FIN
