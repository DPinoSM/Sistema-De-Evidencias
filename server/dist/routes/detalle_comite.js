"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalle_comite_1 = require("../controllers/detalle_comite");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, detalle_comite_1.getDetalle_Comite);
router.post('/', validate_token_1.default, detalle_comite_1.newDetalle_Comite);
router.get('/:id', validate_token_1.default, detalle_comite_1.getOneDetalle_Comite);
router.delete('/:id', validate_token_1.default, detalle_comite_1.deleteDetalle_Comite);
router.put('/:id', validate_token_1.default, detalle_comite_1.updateDetalle_Comite);
exports.default = router;
