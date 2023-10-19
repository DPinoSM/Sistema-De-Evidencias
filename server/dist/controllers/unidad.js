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
exports.deleteUnidad = exports.getOneUnidad = exports.updateUnidad = exports.newUnidad = exports.getUnidad = void 0;
const unidad_1 = require("../models/unidad");
const getUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUnidad = yield unidad_1.Unidad.findAll({ attributes: ['id_unidad', 'nombre_unidad', 'unidad_defecto'] });
    res.json(listUnidad);
});
exports.getUnidad = getUnidad;
const newUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_unidad, nombre_unidad, unidad_defecto } = req.body;
    const idUnidad = yield unidad_1.Unidad.findOne({ where: { id_unidad: id_unidad } });
    if (idUnidad) {
        return res.status(400).json({
            msg: 'Ya existe una Unidad con esa ID'
        });
    }
    try {
        yield unidad_1.Unidad.create({
            "id_unidad": id_unidad,
            "nombre_unidad": nombre_unidad,
            "unidad_defecto": unidad_defecto
        });
        return res.json({
            msg: 'Unidad creada correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newUnidad = newUnidad;
const updateUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre_unidad, unidad_defecto } = req.body;
    const idUnidad = yield unidad_1.Unidad.findOne({ where: { id_unidad: id } });
    if (!idUnidad) {
        return res.status(400).json({
            msg: "El id de la unidad no existe"
        });
    }
    try {
        yield unidad_1.Unidad.update({
            nombre_unidad: nombre_unidad,
            unidad_defecto: unidad_defecto
        }, { where: { id_unidad: id } });
        return res.json({
            msg: 'Unidad ' + id + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la unidad: ' + id,
            error
        });
    }
});
exports.updateUnidad = updateUnidad;
const getOneUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idUnidad = yield unidad_1.Unidad.findOne({ where: { id_unidad: id } });
    if (!idUnidad) {
        return res.status(400).json({
            msg: "El id: " + id + " de la unidad no existes"
        });
    }
    try {
        const unidadOne = yield unidad_1.Unidad.findOne({ where: { id_unidad: id } });
        res.json(unidadOne);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar la unidad: ' + id,
            error
        });
    }
});
exports.getOneUnidad = getOneUnidad;
const deleteUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idUnidad = yield unidad_1.Unidad.findOne({ where: { id_unidad: id } });
    if (!idUnidad) {
        return res.status(400).json({
            msg: "El id: " + id + " de la unidad no existe"
        });
    }
    try {
        yield unidad_1.Unidad.destroy({ where: { id_unidad: id } });
        return res.json({
            msg: 'Unidad de ' + id + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la unidad: ' + id,
            error
        });
    }
});
exports.deleteUnidad = deleteUnidad;
