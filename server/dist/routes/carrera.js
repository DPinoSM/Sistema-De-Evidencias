"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carrera_1 = require("../controllers/carrera");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, carrera_1.getCarreras);
router.post('/', validate_token_1.default, carrera_1.newCarrera);
router.get('/:id', validate_token_1.default, carrera_1.getCarrera);
router.delete('/:id', validate_token_1.default, carrera_1.deleteCarrera);
router.put('/:id', validate_token_1.default, carrera_1.updateCarrera);
exports.default = router;
