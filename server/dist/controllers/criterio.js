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
exports.buscarCriterio = exports.deleteCriterio = exports.getOneCriterio = exports.updateCriterio = exports.newCriterio = exports.getCriterio = void 0;
const criterio_1 = require("../models/criterio");
const sequelize_1 = require("sequelize");
const getCriterio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCriterio = yield criterio_1.Criterio.findAll({ attributes: ['id_criterios', 'nombre_criterios', 'codigo_criterios', 'descripcion_criterios', 'estado_criterios'] });
    res.json(listCriterio);
});
exports.getCriterio = getCriterio;
const newCriterio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_criterios, codigo_criterios, descripcion_criterios, estado_criterios } = req.body;
    const idCriterio = yield criterio_1.Criterio.findOne({ where: { nombre_criterios: nombre_criterios } });
    if (idCriterio) {
        return res.status(400).json({
            msg: 'Ya existe un Criterio con ese nombre'
        });
    }
    try {
        yield criterio_1.Criterio.create({
            "nombre_criterios": nombre_criterios,
            "codigo_criterios": codigo_criterios,
            "descripcion_criterios": descripcion_criterios,
            "estado_criterios": estado_criterios
        });
        return res.json({
            msg: 'Criterio creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newCriterio = newCriterio;
const updateCriterio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre_criterios, codigo_criterios, descripcion_criterios, estado_criterios } = req.body;
    const idCriterio = yield criterio_1.Criterio.findOne({ where: { id_criterios: id } });
    if (!idCriterio) {
        return res.status(400).json({
            msg: "El id del criterio no existe"
        });
    }
    try {
        yield criterio_1.Criterio.update({
            nombre_criterios: nombre_criterios,
            codigo_criterios: codigo_criterios,
            descripcion_criterios: descripcion_criterios,
            estado_criterios: estado_criterios
        }, { where: { id_criterios: id } });
        return res.json({
            msg: 'Criterio ' + id + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el criterio: ' + id,
            error
        });
    }
});
exports.updateCriterio = updateCriterio;
const getOneCriterio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idCriterio = yield criterio_1.Criterio.findOne({ where: { id_criterios: id } });
    if (!idCriterio) {
        return res.status(400).json({
            msg: "El id: " + id + " del criterio no existes"
        });
    }
    try {
        const criterioOne = yield criterio_1.Criterio.findOne({ where: { id_criterios: id } });
        res.json(criterioOne);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el criterio: ' + id,
            error
        });
    }
});
exports.getOneCriterio = getOneCriterio;
const deleteCriterio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idCriterio = yield criterio_1.Criterio.findOne({ where: { id_criterios: id } });
    if (!idCriterio) {
        return res.status(400).json({
            msg: "El id: " + id + " del criterio no existe"
        });
    }
    try {
        yield criterio_1.Criterio.destroy({ where: { id_criterios: id } });
        return res.json({
            msg: 'Criterio ' + id + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el criterio: ' + id,
            error
        });
    }
});
exports.deleteCriterio = deleteCriterio;
//FILTRO DE BUSQUEDA
const buscarCriterio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    if (!searchTerm) {
        return res.status(400).json({
            msg: 'El término de búsqueda no se proporcionó',
        });
    }
    try {
        const criterios = yield criterio_1.Criterio.findAll({
            attributes: ['id_criterios', 'nombre_criterios'],
            where: {
                [sequelize_1.Op.or]: [
                    { id_criterios: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { nombre_criterios: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                ],
            },
        });
        return res.json(criterios);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al buscar roles',
            error,
        });
    }
});
exports.buscarCriterio = buscarCriterio;
