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
exports.deleteEstado = exports.getOneEstado = exports.updateEstado = exports.newEstado = exports.getEstado = void 0;
const estado_1 = require("../models/estado");
const getEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listEstado = yield estado_1.Estado.findAll({ attributes: ['id_estado', 'online_presencial'] });
    res.json(listEstado);
});
exports.getEstado = getEstado;
const newEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { online_presencial } = req.body;
    const idEstado = yield estado_1.Estado.findOne({ where: { online_presencial: online_presencial } });
    if (idEstado) {
        return res.status(400).json({
            msg: 'Ya existe un estado con ese valor'
        });
    }
    try {
        yield estado_1.Estado.create({
            "online_presencial": online_presencial
        });
        return res.json({
            msg: 'Estado creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newEstado = newEstado;
const updateEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { online_presencial } = req.body;
    const idEstado = yield estado_1.Estado.findOne({ where: { id_estado: id } });
    if (!idEstado) {
        return res.status(400).json({
            msg: "El id del estado no existe"
        });
    }
    try {
        yield estado_1.Estado.update({
            online_presencial: online_presencial
        }, { where: { id_estado: id } });
        return res.json({
            msg: 'Estado ' + id + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el estado: ' + id,
            error
        });
    }
});
exports.updateEstado = updateEstado;
const getOneEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idEstado = yield estado_1.Estado.findOne({ where: { id_estado: id } });
    if (!idEstado) {
        return res.status(400).json({
            msg: "El id: " + id + " del estado no existes"
        });
    }
    try {
        const estadoOne = yield estado_1.Estado.findOne({ where: { id_estado: id } });
        res.json(estadoOne);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el estado: ' + id,
            error
        });
    }
});
exports.getOneEstado = getOneEstado;
const deleteEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idEstado = yield estado_1.Estado.findOne({ where: { id_estado: id } });
    if (!idEstado) {
        return res.status(400).json({
            msg: "El id: " + id + " del estado no existe"
        });
    }
    try {
        yield estado_1.Estado.destroy({ where: { id_estado: id } });
        return res.json({
            msg: 'Estado de ' + id + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el estado: ' + id,
            error
        });
    }
});
exports.deleteEstado = deleteEstado;
