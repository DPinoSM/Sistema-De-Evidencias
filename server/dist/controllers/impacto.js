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
exports.deleteImpacto = exports.getOneImpacto = exports.updateImpacto = exports.newImpacto = exports.getImpacto = void 0;
const impacto_1 = require("../models/impacto");
const getImpacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listImpacto = yield impacto_1.Impacto.findAll({ attributes: ['id_impacto', 'interno_externo'] });
    res.json(listImpacto);
});
exports.getImpacto = getImpacto;
const newImpacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { interno_externo } = req.body;
    const idImpacto = yield impacto_1.Impacto.findOne({ where: { interno_externo: interno_externo } });
    if (idImpacto) {
        return res.status(400).json({
            msg: 'Ya existe un impacto con ese valor'
        });
    }
    try {
        yield impacto_1.Impacto.create({
            "interno_externo": interno_externo
        });
        return res.json({
            msg: 'Impacto creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newImpacto = newImpacto;
const updateImpacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { interno_externo } = req.body;
    const idImpacto = yield impacto_1.Impacto.findOne({ where: { id_impacto: id } });
    if (!idImpacto) {
        return res.status(400).json({
            msg: "El id del impacto no existe"
        });
    }
    try {
        yield impacto_1.Impacto.update({
            interno_externo: interno_externo
        }, { where: { id_impacto: id } });
        return res.json({
            msg: 'Impacto ' + id + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el impacto: ' + id,
            error
        });
    }
});
exports.updateImpacto = updateImpacto;
const getOneImpacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idImpacto = yield impacto_1.Impacto.findOne({ where: { id_impacto: id } });
    if (!idImpacto) {
        return res.status(400).json({
            msg: "El id: " + id + " del impacto no existes"
        });
    }
    try {
        const impactoOne = yield impacto_1.Impacto.findOne({ where: { id_impacto: id } });
        res.json(impactoOne);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el impacto: ' + id,
            error
        });
    }
});
exports.getOneImpacto = getOneImpacto;
const deleteImpacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idImpacto = yield impacto_1.Impacto.findOne({ where: { id_impacto: id } });
    if (!idImpacto) {
        return res.status(400).json({
            msg: "El id: " + id + " del impacto no existe"
        });
    }
    try {
        yield impacto_1.Impacto.destroy({ where: { id_impacto: id } });
        return res.json({
            msg: 'Impacto de ' + id + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el impacto: ' + id,
            error
        });
    }
});
exports.deleteImpacto = deleteImpacto;
