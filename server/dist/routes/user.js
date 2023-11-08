"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.post('/', validate_token_1.default, user_1.newUser);
router.get('/lista', validate_token_1.default, user_1.getUsers);
router.post('/login', user_1.loginUser);
router.put('/:id', validate_token_1.default, user_1.updateUser);
router.delete('/:id', validate_token_1.default, user_1.deleteUser);
router.get('/:id', validate_token_1.default, user_1.getUser);
router.get('/buscar', validate_token_1.default, user_1.buscarUsuario);
exports.default = router;
