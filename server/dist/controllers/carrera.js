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
exports.deleteCarrera = exports.getCarrera = exports.updateCarrera = exports.newCarrera = exports.getCarreras = void 0;
const carrera_1 = require("../models/carrera");
const getCarreras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCarrera = yield carrera_1.Carrera.findAll({ attributes: ['id_carrera', 'nombre_carrera', 'area', 'cantidad_matriculados'] });
    res.json(listCarrera);
});
exports.getCarreras = getCarreras;
const newCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_carrera, area, cantidad_matriculados } = req.body;
    const idCarrera = yield carrera_1.Carrera.findOne({ where: { nombre_carrera: nombre_carrera } });
    if (idCarrera) {
        return res.status(400).json({
            msg: 'Ya existe una carrera con ese nombre'
        });
    }
    try {
        yield carrera_1.Carrera.create({
            "nombre_carrera": nombre_carrera,
            "area": area,
            "cantidad_matriculados": cantidad_matriculados
        });
        return res.json({
            msg: 'Carrera creada correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newCarrera = newCarrera;
const updateCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre_carrera, area, cantidad_matriculados } = req.body;
    const idCarrera = yield carrera_1.Carrera.findOne({ where: { id_carrera: id } });
    if (!idCarrera) {
        return res.status(400).json({
            msg: "El id de la carrera no existe"
        });
    }
    try {
        yield carrera_1.Carrera.update({
            nombre_carrera: nombre_carrera,
            area: area,
            cantidad_matriculados: cantidad_matriculados
        }, { where: { id_carrera: id } });
        return res.json({
            msg: 'Carrera ' + id + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la carrera: ' + id,
            error
        });
    }
});
exports.updateCarrera = updateCarrera;
const getCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idCarrera = yield carrera_1.Carrera.findOne({ where: { id_carrera: id } });
    if (!idCarrera) {
        return res.status(400).json({
            msg: "El id: " + id + " de carrera no existe"
        });
    }
    try {
        const idCarrera = yield carrera_1.Carrera.findOne({ where: { id_carrera: id } });
        res.json(idCarrera);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar la carrera: ' + id,
            error
        });
    }
});
exports.getCarrera = getCarrera;
const deleteCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idCarrera = yield carrera_1.Carrera.findOne({ where: { id_carrera: id } });
    if (!idCarrera) {
        return res.status(400).json({
            msg: "El id: " + id + " de la carrera no existe"
        });
    }
    try {
        yield carrera_1.Carrera.destroy({ where: { id_carrera: id } });
        return res.json({
            msg: 'Carrera ' + id + ' borrada correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la carrera: ' + id,
            error
        });
    }
});
exports.deleteCarrera = deleteCarrera;
