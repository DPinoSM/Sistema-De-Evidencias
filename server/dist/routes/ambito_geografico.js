"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ambito_geografico_1 = require("../controllers/ambito_geografico");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, ambito_geografico_1.getAmbitosGeograficos);
router.post('/', validate_token_1.default, ambito_geografico_1.newAmbitoGeografico);
router.get('/:id', validate_token_1.default, ambito_geografico_1.getAmbitoGeografico);
router.delete('/:id', validate_token_1.default, ambito_geografico_1.deleteAmbitoGeografico);
router.put('/:id', validate_token_1.default, ambito_geografico_1.updateAmbitoGeografico);
router.get('buscar', ambito_geografico_1.buscarAmbGeo);
exports.default = router;
