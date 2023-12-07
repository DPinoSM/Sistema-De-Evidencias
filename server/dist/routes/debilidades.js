"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const debilidades_1 = require("../controllers/debilidades");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, debilidades_1.getDebilidades);
router.post('/', validate_token_1.default, debilidades_1.newDebilidades);
router.get('/:id', validate_token_1.default, debilidades_1.getOneDebilidades);
router.delete('/:id', validate_token_1.default, debilidades_1.deleteDebilidades);
router.put('/:id', validate_token_1.default, debilidades_1.updateDebilidades);
exports.default = router;
