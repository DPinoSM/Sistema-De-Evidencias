"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const criterio_1 = require("../controllers/criterio");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, criterio_1.getCriterio);
router.post('/', validate_token_1.default, criterio_1.newCriterio);
router.get('/:id', validate_token_1.default, criterio_1.getOneCriterio);
router.delete('/:id', validate_token_1.default, criterio_1.deleteCriterio);
router.put('/:id', validate_token_1.default, criterio_1.updateCriterio);
exports.default = router;
