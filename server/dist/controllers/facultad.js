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
exports.deleteFacultad = exports.getFacultad = exports.updateFacultad = exports.newFacultad = exports.getFacultades = void 0;
const facultad_1 = require("../models/facultad");
const getFacultades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listFacultad = yield facultad_1.Facultad.findAll({ attributes: ['id_facultad', 'nombre_facultad'] });
    res.json(listFacultad);
});
exports.getFacultades = getFacultades;
const newFacultad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_facultad } = req.body;
    const idFacultad = yield facultad_1.Facultad.findOne({ where: { nombre_facultad: nombre_facultad } });
    if (idFacultad) {
        return res.status(400).json({
            msg: 'Ya existe una facultad con ese nombre'
        });
    }
    try {
        yield facultad_1.Facultad.create({
            "nombre_facultad": nombre_facultad
        });
        return res.json({
            msg: 'Facultad creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newFacultad = newFacultad;
const updateFacultad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre_facultad } = req.body;
    const idFacultad = yield facultad_1.Facultad.findOne({ where: { id_facultad: id } });
    if (!idFacultad) {
        return res.status(400).json({
            msg: "El id de la facultad no existe"
        });
    }
    try {
        yield facultad_1.Facultad.update({
            nombre_facultad: nombre_facultad
        }, { where: { id_facultad: id } });
        return res.json({
            msg: 'Facultad ' + id + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el facultad: ' + id,
            error
        });
    }
});
exports.updateFacultad = updateFacultad;
const getFacultad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idFacultad = yield facultad_1.Facultad.findOne({ where: { id_facultad: id } });
    if (!idFacultad) {
        return res.status(400).json({
            msg: "El id: " + id + " de facultad no existe"
        });
    }
    try {
        const idFacultad = yield facultad_1.Facultad.findOne({ where: { id_facultad: id } });
        res.json(idFacultad);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar la facultad: ' + id,
            error
        });
    }
});
exports.getFacultad = getFacultad;
const deleteFacultad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idFacultad = yield facultad_1.Facultad.findOne({ where: { id_facultad: id } });
    if (!idFacultad) {
        return res.status(400).json({
            msg: "El id: " + id + " del facultad no existe"
        });
    }
    try {
        yield facultad_1.Facultad.destroy({ where: { id_facultad: id } });
        return res.json({
            msg: 'Facultad ' + id + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la facultad: ' + id,
            error
        });
    }
});
exports.deleteFacultad = deleteFacultad;
