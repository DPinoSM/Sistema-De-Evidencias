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
exports.deleteDetalle_Revisor = exports.getOneDetalle_Revisor = exports.updateDetalle_Revisor = exports.newDetalle_Revisor = exports.getDetalle_Revisor = void 0;
const detalle_revisor_1 = require("../models/detalle_revisor");
const sequelize_1 = require("sequelize");
const getDetalle_Revisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listDetalle_Revisor = yield detalle_revisor_1.Detalle_Revisor.findAll({ attributes: ['id_detalle_revisor', 'revisado_revisor', 'estado_revisor', 'comentario_revisor'],
        where: {
            id_detalle_revisor: {
                [sequelize_1.Op.is]: null
            }
        } });
    res.json(listDetalle_Revisor);
});
exports.getDetalle_Revisor = getDetalle_Revisor;
const newDetalle_Revisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { revisado_revisor, estado_revisor, comentario_revisor } = req.body;
    const idDetalle_Revisor = yield detalle_revisor_1.Detalle_Revisor.findOne({ where: { revisado_revisor: revisado_revisor } });
    if (idDetalle_Revisor) {
        return res.status(400).json({
            msg: 'Ya existe un detalle de revisor creado con este valor'
        });
    }
    try {
        yield detalle_revisor_1.Detalle_Revisor.create({
            "revisado_revisor": revisado_revisor,
            "estado_revisor": estado_revisor,
            "comentario_revisor": comentario_revisor
        });
        return res.json({
            msg: 'detalle del revisor creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error al crear el detalle del revisor',
            error
        });
    }
});
exports.newDetalle_Revisor = newDetalle_Revisor;
const updateDetalle_Revisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { revisado_revisor, estado_revisor, comentario_revisor } = req.body;
    const idDetalle_Revisor = yield detalle_revisor_1.Detalle_Revisor.findOne({ where: { id_detalle_revisor: id } });
    if (!idDetalle_Revisor) {
        return res.status(400).json({
            msg: "El id del detalle revisor no existe"
        });
    }
    try {
        yield detalle_revisor_1.Detalle_Revisor.update({
            revisado_revisor: revisado_revisor,
            estado_revisor: estado_revisor,
            comentario_revisor: comentario_revisor
        }, { where: { id_detalle_revisor: id } });
        return res.json({
            msg: 'El detalle del revisor' + id + ' se ha actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el detalle revisor: ' + id,
            error
        });
    }
});
exports.updateDetalle_Revisor = updateDetalle_Revisor;
const getOneDetalle_Revisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idDetalle_Revisor = yield detalle_revisor_1.Detalle_Revisor.findOne({ where: { id_detalle_revisor: id !== 'null' ? id : null } });
    if (!idDetalle_Revisor) {
        return res.status(400).json({
            msg: "El ID: " + id + " del detalle revisor no existe dentro de la base de datos"
        });
    }
    try {
        const Detalle_RevisorOne = yield detalle_revisor_1.Detalle_Revisor.findOne({ where: { id_detalle_revisor: id } });
        res.json(Detalle_RevisorOne);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el Detalle Revisor: ' + id,
            error
        });
    }
});
exports.getOneDetalle_Revisor = getOneDetalle_Revisor;
const deleteDetalle_Revisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idDetalle_Revisor = yield detalle_revisor_1.Detalle_Revisor.findOne({ where: { id_detalle_revisor: id } });
    if (!idDetalle_Revisor) {
        return res.status(400).json({
            msg: "El id: " + id + " del detalle revisor no existe"
        });
    }
    try {
        yield detalle_revisor_1.Detalle_Revisor.destroy({ where: { id_detalle_revisor: id } });
        return res.json({
            msg: 'Detalle revisor ' + id + ' borrado exitosamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el detalle del revisor: ' + id,
            error
        });
    }
});
exports.deleteDetalle_Revisor = deleteDetalle_Revisor;
//FIN
