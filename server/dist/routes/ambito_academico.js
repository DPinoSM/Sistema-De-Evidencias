"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ambito_academico_1 = require("../controllers/ambito_academico");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, ambito_academico_1.getAmbitosAcademicos);
router.post('/', validate_token_1.default, ambito_academico_1.newAmbitoAcademico);
router.get('/:id', validate_token_1.default, ambito_academico_1.getAmbitoAcademico);
router.delete('/:id', validate_token_1.default, ambito_academico_1.deleteAmbitoAcademico);
router.put('/:id', validate_token_1.default, ambito_academico_1.updateAmbitoAcademico);
router.get('/buscar', validate_token_1.default, ambito_academico_1.buscarAmbAca);
exports.default = router;
