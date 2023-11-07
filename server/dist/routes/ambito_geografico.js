"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ambito_geografico_1 = require("../controllers/ambito_geografico");
// import validateToken from './validate-token';
const router = (0, express_1.Router)();
router.get('/lista', ambito_geografico_1.getAmbitosGeograficos);
router.post('/', ambito_geografico_1.newAmbitoGeografico);
router.get('/:id', ambito_geografico_1.getAmbitoGeografico);
router.delete('/:id', ambito_geografico_1.deleteAmbitoGeografico);
router.put('/:id', ambito_geografico_1.updateAmbitoGeografico);
exports.default = router;
