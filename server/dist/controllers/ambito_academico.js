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
exports.buscarAmbAca = exports.updateAmbitoAcademico = exports.deleteAmbitoAcademico = exports.getAmbitoAcademico = exports.getAmbitosAcademicos = exports.newAmbitoAcademico = void 0;
const ambito_academico_1 = require("../models/ambito_academico");
const sequelize_1 = require("sequelize");
const newAmbitoAcademico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_ambito_academico, estado_ambito_academico } = req.body;
    const nomAmbito = yield ambito_academico_1.AmbitoAcademico.findOne({ where: { nombre_ambito_academico: nombre_ambito_academico } });
    if (nomAmbito) {
        return res.status(400).json({
            msg: 'Ya existe un ambito academico con ese nombre'
        });
    }
    try {
        yield ambito_academico_1.AmbitoAcademico.create({
            "nombre_ambito_academico": nombre_ambito_academico,
            "estado_ambito_academico": estado_ambito_academico
        });
        return res.json({
            msg: 'Ambito academico creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newAmbitoAcademico = newAmbitoAcademico;
const getAmbitosAcademicos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listAmbitos = yield ambito_academico_1.AmbitoAcademico.findAll({ attributes: ['id_ambito_academico', 'nombre_ambito_academico', 'estado_ambito_academico'] });
    res.json(listAmbitos);
});
exports.getAmbitosAcademicos = getAmbitosAcademicos;
const getAmbitoAcademico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idAmbitoAcademico = yield ambito_academico_1.AmbitoAcademico.findOne({ attributes: ['id_ambito_academico', 'nombre_ambito_academico', 'estado_ambito_academico'], where: { id_ambito_academico: id } });
    if (!idAmbitoAcademico) {
        return res.status(400).json({
            msg: "El ambito academico indicado no existe"
        });
    }
    try {
        res.json(idAmbitoAcademico);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.getAmbitoAcademico = getAmbitoAcademico;
const deleteAmbitoAcademico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idAmbitoAcademico = yield ambito_academico_1.AmbitoAcademico.findOne({ where: { id_ambito_academico: id } });
    if (!idAmbitoAcademico) {
        return res.status(400).json({
            msg: "El ambito academico no existe"
        });
    }
    try {
        yield ambito_academico_1.AmbitoAcademico.destroy({ where: { id_ambito_academico: id } });
        res.json({
            msg: "Se ha eliminado el ambito academico: "
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.deleteAmbitoAcademico = deleteAmbitoAcademico;
const updateAmbitoAcademico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idAmbitoAcademico = yield ambito_academico_1.AmbitoAcademico.findOne({ where: { id_ambito_academico: id } });
    if (!idAmbitoAcademico) {
        return res.status(400).json({
            msg: "El ambito academico no existe"
        });
    }
    try {
        const { nombre_ambito_academico, estado_ambito_academico } = req.body;
        yield ambito_academico_1.AmbitoAcademico.update({
            nombre_ambito_academico: nombre_ambito_academico,
            estado_ambito_academico: estado_ambito_academico
        }, { where: { id_ambito_academico: id }
        });
        res.json({
            msg: "Se ha actualizado el ambito academico: "
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.updateAmbitoAcademico = updateAmbitoAcademico;
//FILTRO DE BUSQUEDA
const buscarAmbAca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    if (!searchTerm) {
        return res.status(400).json({
            msg: 'El término de búsqueda no se proporcionó',
        });
    }
    try {
        const ambitosAcademicos = yield ambito_academico_1.AmbitoAcademico.findAll({
            attributes: ['id_ambito_academico', 'nombre_ambito_academico'],
            where: {
                [sequelize_1.Op.or]: [
                    { id_ambito_academico: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { nombre_ambito_academico: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                ],
            },
        });
        return res.json(ambitosAcademicos);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al buscar Ambitos academicos',
            error,
        });
    }
});
exports.buscarAmbAca = buscarAmbAca;
