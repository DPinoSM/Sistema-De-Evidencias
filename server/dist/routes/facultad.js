"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facultad_1 = require("../controllers/facultad");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, facultad_1.getFacultades);
router.post('/', validate_token_1.default, facultad_1.newFacultad);
router.get('/:id', validate_token_1.default, facultad_1.getFacultad);
router.delete('/:id', validate_token_1.default, facultad_1.deleteFacultad);
router.put('/:id', validate_token_1.default, facultad_1.updateFacultad);
router.get('/buscar', validate_token_1.default, facultad_1.buscarFacultad);
exports.default = router;
