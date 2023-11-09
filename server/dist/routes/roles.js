"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_1 = require("../controllers/rol");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, rol_1.getRol);
router.post('/', validate_token_1.default, rol_1.newRol);
router.get('/:id', validate_token_1.default, rol_1.getOneRol);
router.delete('/:id', validate_token_1.default, rol_1.deleteRol);
router.put('/:id', validate_token_1.default, rol_1.updateRol);
router.get('/buscar', validate_token_1.default, rol_1.buscarRol);
exports.default = router;
