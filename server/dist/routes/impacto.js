"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const impacto_1 = require("../controllers/impacto");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, impacto_1.getImpácto);
router.post('/', validate_token_1.default, impacto_1.newImpacto);
router.get('/:id', validate_token_1.default, impacto_1.getOneImpacto);
router.delete('/:id', validate_token_1.default, impacto_1.deleteImpacto);
router.put('/:id', validate_token_1.default, impacto_1.updateImpacto);
exports.default = router;
