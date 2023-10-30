"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAmbitoGeografico = exports.deleteAmbitoGeografico = exports.getAmbitoGeografico = exports.getAmbitosGeograficos = exports.newAmbitoGeografico = void 0;
const ambito_geografico_1 = require("../models/ambito_geografico");
const newAmbitoGeografico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_ambito_geografico, estado_ambito_geografico } = req.body;
    const nomAmbitoG = yield ambito_geografico_1.AmbitoGeografico.findOne({ where: { nombre_ambito_geografico: nombre_ambito_geografico } });
    if (nomAmbitoG) {
        return res.status(400).json({
            msg: 'Ya existe un ambito geografico con ese nombre'
        });
    }
    try {
        yield ambito_geografico_1.AmbitoGeografico.create({
            "nombre_ambito_geografico": nombre_ambito_geografico,
            "estado_ambito_geografico": estado_ambito_geografico
        });
        return res.json({
            msg: 'Ambito geografico creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newAmbitoGeografico = newAmbitoGeografico;
const getAmbitosGeograficos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listAmbitosG = yield ambito_geografico_1.AmbitoGeografico.findAll({ attributes: ['id_ambito_geografico', 'nombre_ambito_geografico', 'estado_ambito_geografico'] });
    res.json(listAmbitosG);
});
exports.getAmbitosGeograficos = getAmbitosGeograficos;
const getAmbitoGeografico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idAmbitoGeografico = yield ambito_geografico_1.AmbitoGeografico.findOne({ attributes: ['id_ambito_geografico', 'nombre_ambito_geografico', 'estado_ambito_geografico'], where: { id_ambito_geografico: id } });
    if (!idAmbitoGeografico) {
        return res.status(400).json({
            msg: "El ambito geografico indicado no existe"
        });
    }
    try {
        res.json(idAmbitoGeografico);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.getAmbitoGeografico = getAmbitoGeografico;
const deleteAmbitoGeografico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idAmbitoGeografico = yield ambito_geografico_1.AmbitoGeografico.findOne({ where: { id_ambito_geografico: id } });
    if (!idAmbitoGeografico) {
        return res.status(400).json({
            msg: "El ambito geografico no existe"
        });
    }
    try {
        yield ambito_geografico_1.AmbitoGeografico.destroy({ where: { id_ambito_geografico: id } });
        res.json({
            msg: "Se ha eliminado el ambito geografico: "
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.deleteAmbitoGeografico = deleteAmbitoGeografico;
const updateAmbitoGeografico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idAmbitoGeografico = yield ambito_geografico_1.AmbitoGeografico.findOne({ where: { id_ambito_geografico: id } });
    if (!idAmbitoGeografico) {
        return res.status(400).json({
            msg: "El ambito geografico no existe"
        });
    }
    try {
        const { nombre_ambito_geografico, estado_ambito_geografico } = req.body;
        yield ambito_geografico_1.AmbitoGeografico.update({
            nombre_ambito_geografico: nombre_ambito_geografico,
            estado_ambito_geografico: estado_ambito_geografico
        }, { where: { id_ambito_geografico: id }
        });
        res.json({
            msg: "Se ha actualizado el ambito geografico: "
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.updateAmbitoGeografico = updateAmbitoGeografico;
