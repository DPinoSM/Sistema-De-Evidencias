"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proceso_1 = require("../controllers/proceso");
// import validateToken from './validate-token';
const router = (0, express_1.Router)();
router.get('/lista', proceso_1.getProcesos);
router.post('/', proceso_1.newProceso);
router.get('/:id', proceso_1.getProceso);
router.delete('/:id', proceso_1.deleteProceso);
router.put('/:id', proceso_1.updateProceso);
exports.default = router;
