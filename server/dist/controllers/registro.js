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
exports.buscarRegistro = exports.deleteRegistro = exports.getOneRegistro = exports.updateRegistro = exports.newRegistro = exports.getRegistro = void 0;
const registro_1 = require("../models/registro");
const sequelize_1 = require("sequelize");
const getRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listRegistro = yield registro_1.Registro.findAll({ attributes: ['id_registro', 'datos_registro', 'contenido_registro'] });
    res.json(listRegistro);
});
exports.getRegistro = getRegistro;
const newRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { datos_registro, contenido_registro } = req.body;
    const idRegistro = yield registro_1.Registro.findOne({ where: { datos_registro: datos_registro } });
    if (idRegistro) {
        return res.status(400).json({
            msg: 'Ya existe un Registro con esa ID'
        });
    }
    try {
        yield registro_1.Registro.create({
            "datos_registro": datos_registro,
            "contenido_registro": contenido_registro
        });
        return res.json({
            msg: 'Registro creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newRegistro = newRegistro;
const updateRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { datos_registro, contenido_registro } = req.body;
    const idRegistro = yield registro_1.Registro.findOne({ where: { id_registro: id } });
    if (!idRegistro) {
        return res.status(400).json({
            msg: "El id del registro no existe"
        });
    }
    try {
        yield registro_1.Registro.update({
            datos_registro: datos_registro,
            contenido_registro: contenido_registro
        }, { where: { id_registro: id } });
        return res.json({
            msg: 'Registro ' + id + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el registro: ' + id,
            error
        });
    }
});
exports.updateRegistro = updateRegistro;
const getOneRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idRegistro = yield registro_1.Registro.findOne({ where: { id_registro: id } });
    if (!idRegistro) {
        return res.status(400).json({
            msg: "El id: " + id + " del registro no existes"
        });
    }
    try {
        const registroOne = yield registro_1.Registro.findOne({ where: { id_registro: id } });
        res.json(registroOne);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el registro: ' + id,
            error
        });
    }
});
exports.getOneRegistro = getOneRegistro;
const deleteRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idRegistro = yield registro_1.Registro.findOne({ where: { id_registro: id } });
    if (!idRegistro) {
        return res.status(400).json({
            msg: "El id: " + id + " del registro no existe"
        });
    }
    try {
        yield registro_1.Registro.destroy({ where: { id_registro: id } });
        return res.json({
            msg: 'Registro de ' + id + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el registro: ' + id,
            error
        });
    }
});
exports.deleteRegistro = deleteRegistro;
//FILTRO DE BUSQUEDA
const buscarRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    if (!searchTerm) {
        return res.status(400).json({
            msg: 'El término de búsqueda no se proporcionó',
        });
    }
    try {
        const registros = yield registro_1.Registro.findAll({
            attributes: ['id_registro', 'datos_registro'],
            where: {
                [sequelize_1.Op.or]: [
                    { id_registro: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { datos_registro: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                ],
            },
        });
        return res.json(registros);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al buscar registros',
            error,
        });
    }
});
exports.buscarRegistro = buscarRegistro;
