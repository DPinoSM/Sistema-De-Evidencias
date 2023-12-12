"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalle_revisor_1 = require("../controllers/detalle_revisor");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, detalle_revisor_1.getDetalle_Revisor);
router.post('/', validate_token_1.default, detalle_revisor_1.newDetalle_Revisor);
router.get('/:id', validate_token_1.default, detalle_revisor_1.getOneDetalle_Revisor);
router.delete('/:id', validate_token_1.default, detalle_revisor_1.deleteDetalle_Revisor);
router.put('/:id', validate_token_1.default, detalle_revisor_1.updateDetalle_Revisor);
exports.default = router;
