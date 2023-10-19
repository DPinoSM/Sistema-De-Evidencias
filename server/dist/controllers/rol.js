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
exports.deleteRol = exports.getOneRol = exports.updateRol = exports.newRol = exports.getRol = void 0;
const rol_1 = require("../models/rol");
const getRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listRol = yield rol_1.Rol.findAll({ attributes: ['id_rol', 'numero_rol', 'nombre_rol'] });
    res.json(listRol);
});
exports.getRol = getRol;
const newRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_rol } = req.body;
    const idRol = yield rol_1.Rol.findOne({ where: { nombre_rol: nombre_rol } });
    if (idRol) {
        return res.status(400).json({
            msg: 'Ya existe un Rol con ese nombre'
        });
    }
    try {
        yield rol_1.Rol.create({
            "nombre_rol": nombre_rol
        });
        return res.json({
            msg: 'Rol creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newRol = newRol;
const updateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre_rol } = req.body;
    const idRol = yield rol_1.Rol.findOne({ where: { id_rol: id } });
    if (!idRol) {
        return res.status(400).json({
            msg: "El id del rol no existe"
        });
    }
    try {
        yield rol_1.Rol.update({
            nombre_rol: nombre_rol
        }, { where: { id_rol: id } });
        return res.json({
            msg: 'Usuario ' + id + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el rol: ' + id,
            error
        });
    }
});
exports.updateRol = updateRol;
const getOneRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idRol = yield rol_1.Rol.findOne({ where: { id_rol: id } });
    if (!idRol) {
        return res.status(400).json({
            msg: "El id: " + id + " del rol no existes"
        });
    }
    try {
        const rolOne = yield rol_1.Rol.findOne({ where: { id_rol: id } });
        res.json(rolOne);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el rol: ' + id,
            error
        });
    }
});
exports.getOneRol = getOneRol;
const deleteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idRol = yield rol_1.Rol.findOne({ where: { id_rol: id } });
    if (!idRol) {
        return res.status(400).json({
            msg: "El id: " + id + " del rol no existe"
        });
    }
    try {
        yield rol_1.Rol.destroy({ where: { id_rol: id } });
        return res.json({
            msg: 'Rol de ' + id + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el rol: ' + id,
            error
        });
    }
});
exports.deleteRol = deleteRol;
