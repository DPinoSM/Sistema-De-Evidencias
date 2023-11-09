"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estado_1 = require("../controllers/estado");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, estado_1.getEstado);
router.post('/', validate_token_1.default, estado_1.newEstado);
router.get('/:id', validate_token_1.default, estado_1.getOneEstado);
router.delete('/:id', validate_token_1.default, estado_1.deleteEstado);
router.put('/:id', validate_token_1.default, estado_1.updateEstado);
exports.default = router;
