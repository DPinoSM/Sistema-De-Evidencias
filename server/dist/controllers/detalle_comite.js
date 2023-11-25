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
exports.deleteDetalle_Comite = exports.getOneDetalle_Comite = exports.updateDetalle_Comite = exports.newDetalle_Comite = exports.getDetalle_Comite = void 0;
const detalle_comite_1 = require("../models/detalle_comite");
const getDetalle_Comite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listDetalle_Comite = yield detalle_comite_1.Detalle_Comite.findAll({ attributes: ['id_detalle_comite', 'revisado_comite', 'estado_comite', 'comentario_comite'] });
    res.json(listDetalle_Comite);
});
exports.getDetalle_Comite = getDetalle_Comite;
const newDetalle_Comite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { revisado_comite, estado_comite, comentario_comite } = req.body;
    const id_Detalle_Comite = yield detalle_comite_1.Detalle_Comite.findOne({ where: { revisado_comite: revisado_comite } });
    if (id_Detalle_Comite) {
        return res.status(400).json({
            msg: 'Ya existe una revisión del Comité con este valor'
        });
    }
    try {
        yield detalle_comite_1.Detalle_Comite.create({
            "revisado_comite": revisado_comite,
            "estado_comite": estado_comite,
            "comentario_comite": comentario_comite
        });
        return res.json({
            msg: 'Detalle Comite creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error al crear el detalle Comite',
            error
        });
    }
});
exports.newDetalle_Comite = newDetalle_Comite;
const updateDetalle_Comite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { revisado_comite, estado_comite, comentario_comite } = req.body;
    const id_Detalle_Comite = yield detalle_comite_1.Detalle_Comite.findOne({ where: { id_detalle_comite: id } });
    if (!id_Detalle_Comite) {
        return res.status(400).json({
            msg: "La ID de detalle Comite no existe"
        });
    }
    try {
        yield detalle_comite_1.Detalle_Comite.update({
            revisado_comite: revisado_comite,
            estado_comite: estado_comite,
            comentario_comite: comentario_comite
        }, { where: { id_detalle_comite: id } });
        return res.json({
            msg: 'El detalle Comite con ID:' + id + ' se ha actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el detalle Comite: ' + id,
            error
        });
    }
});
exports.updateDetalle_Comite = updateDetalle_Comite;
const getOneDetalle_Comite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const id_Detalle_Comite = yield detalle_comite_1.Detalle_Comite.findOne({ where: { id_detalle_comite: id } });
    if (!id_Detalle_Comite) {
        return res.status(400).json({
            msg: "El ID: " + id + " del detalle Comite no existe dentro de la base de datos"
        });
    }
    try {
        const Detalle_ComiteOne = yield detalle_comite_1.Detalle_Comite.findOne({ where: { id_detalle_comite: id } });
        res.json(Detalle_ComiteOne);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el detalle Comite: ' + id,
            error
        });
    }
});
exports.getOneDetalle_Comite = getOneDetalle_Comite;
const deleteDetalle_Comite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const id_Detalle_Comite = yield detalle_comite_1.Detalle_Comite.findOne({ where: { id_detalle_comite: id } });
    if (!id_Detalle_Comite) {
        return res.status(400).json({
            msg: "El ID: " + id + " del detalle Comite no existe"
        });
    }
    try {
        yield detalle_comite_1.Detalle_Comite.destroy({ where: { id_detalle_comite: id } });
        return res.json({
            msg: 'El detalle Comite con ID: ' + id + ' ha sido borrada exitosamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el detalle Comite: ' + id,
            error
        });
    }
});
exports.deleteDetalle_Comite = deleteDetalle_Comite;
