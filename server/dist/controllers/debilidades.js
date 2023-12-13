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
exports.deleteDebilidades = exports.getOneDebilidades = exports.updateDebilidades = exports.newDebilidades = exports.getDebilidades = void 0;
const debilidades_1 = require("../models/debilidades");
const getDebilidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listDebilidades = yield debilidades_1.Debilidades.findAll({
            attributes: [
                'id_debilidades',
                'descripcion_debilidades',
                'estado_debilidades',
            ],
        });
        res.json(listDebilidades);
    }
    catch (error) {
        console.error('Error en el controlador getDebilidades: ', error);
        res.status(500).json({
            msg: 'Ocurrio un error en el servidor',
            error,
        });
    }
});
exports.getDebilidades = getDebilidades;
const newDebilidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { descripcion_debilidades, estado_debilidades, } = req.body;
        const id_Debilidades = yield debilidades_1.Debilidades.findOne({ where: { descripcion_debilidades } });
        if (id_Debilidades) {
            return res.status(400).json({
                msg: 'Ya existe una descripcion de debilidad creado con este valor'
            });
        }
        const newDebilidades = yield debilidades_1.Debilidades.create({
            descripcion_debilidades,
            estado_debilidades,
        });
        const debilidadesConRelaciones = yield newDebilidades.reload();
        return res.json({
            msg: 'Descripción de la debilidad creado correctamente',
            debilidad: debilidadesConRelaciones,
        });
    }
    catch (error) {
        console.log('Error en el controlador newDebilidades', error);
        res.status(400).json({
            msg: 'Ocurrio un error al crear la descripción de la debilidad',
            error
        });
    }
});
exports.newDebilidades = newDebilidades;
const updateDebilidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { descripcion_debilidades, estado_debilidades } = req.body;
    const id_Debilidades = yield debilidades_1.Debilidades.findOne({ where: { id_debilidades: id } });
    if (!id_Debilidades) {
        return res.status(400).json({
            msg: "La ID de la debilidad no existe"
        });
    }
    try {
        yield debilidades_1.Debilidades.update({
            descripcion_debilidades,
            estado_debilidades,
        }, { where: { id_debilidades: id } });
        return res.json({
            msg: 'La debilidad con ID:' + id + ' se ha actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el Detalle Revisor: ' + id,
            error
        });
    }
});
exports.updateDebilidades = updateDebilidades;
const getOneDebilidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const id_Debilidades = yield debilidades_1.Debilidades.findOne({ where: { id_debilidades: id } });
    if (!id_Debilidades) {
        return res.status(400).json({
            msg: "El ID: " + id + " de la debilidad no existe dentro de la BD"
        });
    }
    try {
        const DebilidadesOne = yield debilidades_1.Debilidades.findOne({ where: { id_debilidades: id } });
        res.json(DebilidadesOne);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar la debilidad: ' + id,
            error
        });
    }
});
exports.getOneDebilidades = getOneDebilidades;
const deleteDebilidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const id_Debilidades = yield debilidades_1.Debilidades.findOne({ where: { id_debilidades: id } });
    if (!id_Debilidades) {
        return res.status(400).json({
            msg: "El Id: " + id + " de la debilidad no existe"
        });
    }
    try {
        yield debilidades_1.Debilidades.destroy({ where: { id_debilidades: id } });
        return res.json({
            msg: 'La debilidad con ID: ' + id + ' ha sido borrada exitosamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la debilidad: ' + id,
            error
        });
    }
});
exports.deleteDebilidades = deleteDebilidades;
