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
exports.buscarEvidencia = exports.updateEvidencia = exports.deleteEvidencia = exports.getEvidencia = exports.getEvidencias = exports.newEvidencia = void 0;
const evidencias_1 = require("../models/evidencias");
const unidad_1 = require("../models/unidad");
const sequelize_1 = require("sequelize");
const detalle_revisor_1 = require("../models/detalle_revisor");
const detalle_dac_1 = require("../models/detalle_dac");
const detalle_comite_1 = require("../models/detalle_comite");
const user_1 = require("../models/user");
const debilidades_1 = require("../models/debilidades");
const ambito_geografico_1 = require("../models/ambito_geografico");
const ambito_academico_1 = require("../models/ambito_academico");
const registro_1 = require("../models/registro");
const carrera_1 = require("../models/carrera");
const facultad_1 = require("../models/facultad");
const proceso_1 = require("../models/proceso");
const impacto_1 = require("../models/impacto");
const estado_1 = require("../models/estado");
const newEvidencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { numero_folio, correo_usuario, rut_usuario, fecha_evidencia, numero_de_mejoras, descripcion, resultado, almacenamiento, unidades_personas_evidencias, palabra_clave, nombre_corto_evidencia, fecha_creacion, fecha_actualizacion, asistentes_internos_autoridades, asistentes_internos_administrativos, asistentes_internos_docentes, asistentes_internos_estudiantes, asistentes_externos_autoridades, asistentes_externos_administrativos, asistentes_externos_docentes, asistentes_externos_estudiantes, archivo_adjunto, id_detalle_revisor, id_detalle_dac, id_detalle_comite, id_usuario, id_debilidades, id_unidad, id_ambito_geografico, id_ambito_academico, id_registro, id_carrera, id_facultad, id_procesos, id_impacto, id_estado } = req.body;
        const numeroFolio = yield evidencias_1.Evidencias.findOne({ where: { numero_folio } });
        if (numeroFolio) {
            return res.status(400).json({
                msg: 'Ya existe una Evidencia con ese número de folio',
            });
        }
        const newEvidencia = yield evidencias_1.Evidencias.create({
            numero_folio,
            correo_usuario,
            rut_usuario,
            fecha_evidencia,
            numero_de_mejoras,
            descripcion,
            resultado,
            almacenamiento,
            unidades_personas_evidencias,
            palabra_clave,
            nombre_corto_evidencia,
            fecha_creacion,
            fecha_actualizacion,
            asistentes_internos_autoridades,
            asistentes_internos_administrativos,
            asistentes_internos_docentes,
            asistentes_internos_estudiantes,
            asistentes_externos_autoridades,
            asistentes_externos_administrativos,
            asistentes_externos_docentes,
            asistentes_externos_estudiantes,
            archivo_adjunto,
            id_detalle_revisor,
            id_detalle_dac,
            id_detalle_comite,
            id_usuario,
            id_debilidades,
            id_unidad,
            id_ambito_geografico,
            id_ambito_academico,
            id_registro,
            id_carrera,
            id_facultad,
            id_procesos,
            id_impacto,
            id_estado
        });
        const evidenciaConRelaciones = yield newEvidencia.reload();
        return res.json({
            msg: 'Evidencia creada correctamente',
            evidencia: evidenciaConRelaciones,
        });
    }
    catch (error) {
        console.error('Error en el controlador newEvidencia:', error);
        res.status(400).json({
            msg: 'Ocurrió un error',
            error,
        });
    }
});
exports.newEvidencia = newEvidencia;
const getEvidencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listEvidencias = yield evidencias_1.Evidencias.findAll({
            attributes: [
                'id_evidencias',
                'numero_folio',
                'correo_usuario',
                'rut_usuario',
                'fecha_evidencia',
                'numero_de_mejoras',
                'descripcion',
                'resultado',
                'almacenamiento',
                'unidades_personas_evidencias',
                'palabra_clave',
                'nombre_corto_evidencia',
                'fecha_creacion',
                'fecha_actualizacion',
                'asistentes_internos_autoridades',
                'asistentes_internos_administrativos',
                'asistentes_internos_docentes',
                'asistentes_internos_estudiantes',
                'asistentes_externos_autoridades',
                'asistentes_externos_administrativos',
                'asistentes_externos_docentes',
                'asistentes_externos_estudiantes',
                'archivo_adjunto'
            ],
            include: [
                { model: detalle_revisor_1.Detalle_Revisor, attributes: ['revisado_revisor', 'comentario_revisor'] },
                { model: detalle_dac_1.Detalle_DAC, attributes: ['revisado_dac', 'comentario_dac'] },
                { model: detalle_comite_1.Detalle_Comite, attributes: ['revisado_comite', 'comentario_comite'] },
                { model: user_1.User, attributes: ['nombre_usuario'] },
                { model: debilidades_1.Debilidades, attributes: ['descripcion_debilidades'] },
                { model: unidad_1.Unidad, attributes: ['nombre_unidad'] },
                { model: ambito_geografico_1.AmbitoGeografico, attributes: ['nombre_ambito_geografico'] },
                { model: ambito_academico_1.AmbitoAcademico, attributes: ['nombre_ambito_academico'] },
                { model: registro_1.Registro, attributes: ['datos_registro', 'contenido_registro'] },
                { model: carrera_1.Carrera, attributes: ['nombre_carrera'] },
                { model: facultad_1.Facultad, attributes: ['nombre_facultad'] },
                { model: proceso_1.Proceso, attributes: ['nombre_procesos'] },
                { model: impacto_1.Impacto, attributes: ['interno_externo'] },
                { model: estado_1.Estado, attributes: ['online_presencial'] }
            ],
        });
        res.json(listEvidencias);
    }
    catch (error) {
        console.error('Error en el controlador getEvidencias:', error);
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor',
            error,
        });
    }
});
exports.getEvidencias = getEvidencias;
const getEvidencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const idUEvidencia = yield evidencias_1.Evidencias.findOne({ where: { id_evidencias: id } });
        if (!idUEvidencia) {
            return res.status(400).json({
                msg: 'La evidencia indicada no existe',
            });
        }
        res.json(idUEvidencia);
    }
    catch (error) {
        console.error('Error en el controlador getEvidencia:', error);
        res.status(400).json({
            msg: 'Ha ocurrido un error',
            error,
        });
    }
});
exports.getEvidencia = getEvidencia;
const deleteEvidencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const idUEvidencia = yield evidencias_1.Evidencias.findOne({ where: { id_evidencias: id } });
        if (!idUEvidencia) {
            return res.status(400).json({
                msg: `La evidencia ${id} no existe`,
            });
        }
        yield evidencias_1.Evidencias.destroy({ where: { id_evidencias: id } });
        res.json({
            msg: `Se ha eliminado la evidencia: ${id}`,
        });
    }
    catch (error) {
        console.error('Error en el controlador deleteEvidencia:', error);
        res.status(400).json({
            msg: `No se ha podido eliminar la evidencia ${id}`,
            error,
        });
    }
});
exports.deleteEvidencia = deleteEvidencia;
const updateEvidencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { numero_folio, correo_usuario, rut_usuario, fecha_evidencia, numero_de_mejoras, descripcion, resultado, almacenamiento, unidades_personas_evidencias, palabra_clave, nombre_corto_evidencia, fecha_creacion, fecha_actualizacion, asistentes_internos_autoridades, asistentes_internos_administrativos, asistentes_internos_docentes, asistentes_internos_estudiantes, asistentes_externos_autoridades, asistentes_externos_administrativos, asistentes_externos_docentes, asistentes_externos_estudiantes, archivo_adjunto, id_detalle_revisor, id_detalle_dac, id_detalle_comite, id_usuario, id_debilidades, id_unidad, id_ambito_geografico, id_ambito_academico, id_registro, id_carrera, id_facultad, id_procesos, id_impacto, id_estado } = req.body;
        const idEvidencia = yield evidencias_1.Evidencias.findOne({ where: { id_evidencias: id } });
        if (!idEvidencia) {
            return res.status(400).json({
                msg: `El id ${id} de la evidencia no existe`,
            });
        }
        yield evidencias_1.Evidencias.update({
            numero_folio,
            correo_usuario,
            rut_usuario,
            fecha_evidencia,
            numero_de_mejoras,
            descripcion,
            resultado,
            almacenamiento,
            unidades_personas_evidencias,
            palabra_clave,
            nombre_corto_evidencia,
            fecha_creacion,
            fecha_actualizacion,
            asistentes_internos_autoridades,
            asistentes_internos_administrativos,
            asistentes_internos_docentes,
            asistentes_internos_estudiantes,
            asistentes_externos_autoridades,
            asistentes_externos_administrativos,
            asistentes_externos_docentes,
            asistentes_externos_estudiantes,
            archivo_adjunto,
            id_detalle_revisor,
            id_detalle_dac,
            id_detalle_comite,
            id_usuario,
            id_debilidades,
            id_unidad,
            id_ambito_geografico,
            id_ambito_academico,
            id_registro,
            id_carrera,
            id_facultad,
            id_procesos,
            id_impacto,
            id_estado
        }, { where: { id_evidencias: id } });
        res.json({
            msg: `Se ha actualizado la evidencia: ${id}`,
        });
    }
    catch (error) {
        console.error('Error en el controlador updateEvidencia:', error);
        res.status(400).json({
            msg: `No se ha podido actualizar la evidencia con id: ${id}`,
            error,
        });
    }
});
exports.updateEvidencia = updateEvidencia;
const buscarEvidencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    if (!searchTerm) {
        return res.status(400).json({
            msg: 'El termino de busqueda no se proporcionó',
        });
    }
    try {
        const evidencias = yield evidencias_1.Evidencias.findAll({
            attributes: ['id_evidencias', 'nombre_corto_evidencia'],
            where: {
                [sequelize_1.Op.or]: [
                    { id_evidencias: { [sequelize_1.Op.like]: `%{searchTerm}%` } },
                    { nombre_corto_evidencia: { [sequelize_1.Op.like]: `%{searchTerm}%` } },
                ],
            },
        });
        return res.json(evidencias);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al buscar Evidencias',
        });
    }
});
exports.buscarEvidencia = buscarEvidencia;
