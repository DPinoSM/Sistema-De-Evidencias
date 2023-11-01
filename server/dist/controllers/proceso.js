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
exports.updateProceso = exports.deleteProceso = exports.getProceso = exports.getProcesos = exports.newProceso = void 0;
const proceso_1 = require("../models/proceso");
const newProceso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_procesos, codigo_procesos, estado_procesos } = req.body;
    const codProcesos = yield proceso_1.Proceso.findOne({ where: { codigo_procesos: codigo_procesos } });
    const nomProcesos = yield proceso_1.Proceso.findOne({ where: { nombre_procesos: nombre_procesos } });
    if (codProcesos) {
        return res.status(400).json({
            msg: 'Ya existe un proceso con ese codigo'
        });
    }
    if (nomProcesos) {
        return res.status(400).json({
            msg: 'Ya existe un proceso con ese nombre'
        });
    }
    try {
        yield proceso_1.Proceso.create({
            "nombre_procesos": nombre_procesos,
            "codigo_procesos": codigo_procesos,
            "estado_procesos": estado_procesos
        });
        return res.json({
            msg: 'Proceso creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newProceso = newProceso;
const getProcesos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProcesos = yield proceso_1.Proceso.findAll({ attributes: ['id_procesos', 'codigo_procesos', 'nombre_procesos', 'estado_procesos'] });
    res.json(listProcesos);
});
exports.getProcesos = getProcesos;
const getProceso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idProcesos = yield proceso_1.Proceso.findOne({ attributes: ['codigo_procesos', 'nombre_procesos'], where: { id_procesos: id } });
    if (!idProcesos) {
        return res.status(400).json({
            msg: "El proceso indicado no existe"
        });
    }
    try {
        res.json(idProcesos);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.getProceso = getProceso;
const deleteProceso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idProceso = yield proceso_1.Proceso.findOne({ where: { id_procesos: id } });
    if (!idProceso) {
        return res.status(400).json({
            msg: "El proceso no existe"
        });
    }
    try {
        yield proceso_1.Proceso.destroy({ where: { id_procesos: id } });
        res.json({
            msg: "Se ha eliminado el proceso: "
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.deleteProceso = deleteProceso;
const updateProceso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idProceso = yield proceso_1.Proceso.findOne({ where: { id_procesos: id } });
    if (!idProceso) {
        return res.status(400).json({
            msg: "El proceso no existe"
        });
    }
    try {
        const { codigo_procesos, nombre_procesos, estado_procesos } = req.body;
        yield proceso_1.Proceso.update({
            nombre_procesos: nombre_procesos,
            codigo_procesos: codigo_procesos,
            estado_procesos: estado_procesos
        }, { where: { id_procesos: id }
        });
        res.json({
            msg: "Se ha actualizado el proceso: "
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.updateProceso = updateProceso;
