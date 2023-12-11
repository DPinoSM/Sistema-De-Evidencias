"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evidencias_1 = require("../controllers/evidencias");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/lista', evidencias_1.getEvidencias);
router.post('/', evidencias_1.newEvidencia);
router.get('/:id', evidencias_1.getEvidencia);
router.delete('/:id', evidencias_1.deleteEvidencia);
router.put('/:id', evidencias_1.updateEvidencia);
router.get('/buscar', validate_token_1.default, evidencias_1.buscarEvidencia);
router.get('/pdf/:id', evidencias_1.generarPDF);
router.get('/usuario/:id_usuario', evidencias_1.getEvidenciasByUsuario);
exports.default = router;
