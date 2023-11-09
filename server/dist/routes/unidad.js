"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const unidad_1 = require("../controllers/unidad");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, unidad_1.getUnidad);
router.post('/', validate_token_1.default, unidad_1.newUnidad);
router.get('/:id', validate_token_1.default, unidad_1.getOneUnidad);
router.delete('/:id', validate_token_1.default, unidad_1.deleteUnidad);
router.put('/:id', validate_token_1.default, unidad_1.updateUnidad);
router.get('/buscar', validate_token_1.default, unidad_1.buscarUnidad);
exports.default = router;
