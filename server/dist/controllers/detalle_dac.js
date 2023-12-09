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
exports.deleteDetalle_DAC = exports.getOneDetalle_DAC = exports.updateDetalle_DAC = exports.newDetalle_DAC = exports.getDetalle_DAC = void 0;
const detalle_dac_1 = require("../models/detalle_dac");
const sequelize_1 = require("sequelize");
const getDetalle_DAC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listDetalle_DAC = yield detalle_dac_1.Detalle_DAC.findAll({ attributes: ['id_detalle_dac', 'revisado_dac', 'estado_dac', 'comentario_dac'],
        where: {
            id_detalle_dac: {
                [sequelize_1.Op.is]: null
            }
        } });
    res.json(listDetalle_DAC);
});
exports.getDetalle_DAC = getDetalle_DAC;
const newDetalle_DAC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { revisado_dac, estado_dac, comentario_dac } = req.body;
    const id_Detalle_DAC = yield detalle_dac_1.Detalle_DAC.findOne({ where: { revisado_dac: revisado_dac } });
    if (id_Detalle_DAC) {
        return res.status(400).json({
            msg: 'Ya existe una revisión del DAC con este valor'
        });
    }
    try {
        yield detalle_dac_1.Detalle_DAC.create({
            "revisado_dac": revisado_dac,
            "estado_dac": estado_dac,
            "comentario_dac": comentario_dac
        });
        return res.json({
            msg: 'Detalle DAC creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error al crear el detalle DAC',
            error
        });
    }
});
exports.newDetalle_DAC = newDetalle_DAC;
const updateDetalle_DAC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { revisado_dac, estado_dac, comentario_dac } = req.body;
    const id_Detalle_DAC = yield detalle_dac_1.Detalle_DAC.findOne({ where: { id_detalle_dac: id } });
    if (!id_Detalle_DAC) {
        return res.status(400).json({
            msg: "La ID de detalle DAC no existe"
        });
    }
    try {
        yield detalle_dac_1.Detalle_DAC.update({
            revisado_dac: revisado_dac,
            estado_dac: estado_dac,
            comentario_dac: comentario_dac
        }, { where: { id_detalle_dac: id } });
        return res.json({
            msg: 'El detalle DAC con ID:' + id + ' se ha actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el detalle DAC: ' + id,
            error
        });
    }
});
exports.updateDetalle_DAC = updateDetalle_DAC;
const getOneDetalle_DAC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const id_Detalle_DAC = yield detalle_dac_1.Detalle_DAC.findOne({ where: { id_detalle_dac: id !== 'null' ? id : null } });
    if (!id_Detalle_DAC) {
        return res.status(400).json({
            msg: "El ID: " + id + " del detalle DAC no existe dentro de la base de datos"
        });
    }
    try {
        const Detalle_DACOne = yield detalle_dac_1.Detalle_DAC.findOne({ where: { id_detalle_dac: id } });
        res.json(Detalle_DACOne);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el detalle DAC: ' + id,
            error
        });
    }
});
exports.getOneDetalle_DAC = getOneDetalle_DAC;
const deleteDetalle_DAC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const id_Detalle_DAC = yield detalle_dac_1.Detalle_DAC.findOne({ where: { id_detalle_dac: id } });
    if (!id_Detalle_DAC) {
        return res.status(400).json({
            msg: "El ID: " + id + " del detalle DAC no existe"
        });
    }
    try {
        yield detalle_dac_1.Detalle_DAC.destroy({ where: { id_detalle_dac: id } });
        return res.json({
            msg: 'El detalle DAC con ID: ' + id + ' ha sido borrada exitosamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el detalle DAC: ' + id,
            error
        });
    }
});
exports.deleteDetalle_DAC = deleteDetalle_DAC;
