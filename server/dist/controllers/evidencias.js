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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvidenciasByUsuario = exports.generarPDF = exports.buscarEvidencia = exports.updateEvidencia = exports.deleteEvidencia = exports.getEvidencia = exports.getEvidencias = exports.newEvidencia = void 0;
const evidencias_1 = require("../models/evidencias");
const unidad_1 = require("../models/unidad");
const sequelize_1 = require("sequelize");
const detalle_revisor_1 = require("../models/detalle_revisor");
const detalle_dac_1 = require("../models/detalle_dac");
const detalle_comite_1 = require("../models/detalle_comite");
const user_1 = require("../models/user");
const debilidades_1 = require("../models/debilidades");
const criterio_1 = require("../models/criterio");
const ambito_geografico_1 = require("../models/ambito_geografico");
const ambito_academico_1 = require("../models/ambito_academico");
const registro_1 = require("../models/registro");
const carrera_1 = require("../models/carrera");
const facultad_1 = require("../models/facultad");
const proceso_1 = require("../models/proceso");
const impacto_1 = require("../models/impacto");
const estado_1 = require("../models/estado");
const pdfmake_1 = __importDefault(require("pdfmake/build/pdfmake"));
const vfs_fonts_1 = __importDefault(require("pdfmake/build/vfs_fonts"));
const newEvidencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { numero_folio, correo_usuario, rut_usuario, fecha_evidencia, numero_de_mejoras, descripcion, resultado, almacenamiento, unidades_personas_evidencias, palabra_clave, nombre_corto_evidencia, fecha_creacion, fecha_actualizacion, asistentes_internos_autoridades, asistentes_internos_administrativos, asistentes_internos_docentes, asistentes_internos_estudiantes, asistentes_externos_autoridades, asistentes_externos_administrativos, asistentes_externos_docentes, asistentes_externos_estudiantes, archivo_adjunto, id_detalle_revisor, id_detalle_dac, id_detalle_comite, id_usuario, id_debilidades, id_criterios, id_unidad, id_ambito_geografico, id_ambito_academico, id_registro, id_carrera, id_facultad, id_procesos, id_impacto, id_estado } = req.body;
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
            id_criterios,
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
                { model: detalle_revisor_1.Detalle_Revisor, as: 'detalle_revisor', attributes: ['revisado_revisor', 'comentario_revisor'] },
                { model: detalle_dac_1.Detalle_DAC, attributes: ['revisado_dac', 'comentario_dac'] },
                { model: detalle_comite_1.Detalle_Comite, attributes: ['revisado_comite', 'comentario_comite'] },
                { model: user_1.User, attributes: ['nombre_usuario'] },
                { model: debilidades_1.Debilidades, attributes: ['descripcion_debilidades'] },
                { model: criterio_1.Criterio, attributes: ['nombre_criterios'] },
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
        const { numero_folio, correo_usuario, rut_usuario, fecha_evidencia, numero_de_mejoras, descripcion, resultado, almacenamiento, unidades_personas_evidencias, palabra_clave, nombre_corto_evidencia, fecha_creacion, fecha_actualizacion, asistentes_internos_autoridades, asistentes_internos_administrativos, asistentes_internos_docentes, asistentes_internos_estudiantes, asistentes_externos_autoridades, asistentes_externos_administrativos, asistentes_externos_docentes, asistentes_externos_estudiantes, archivo_adjunto, id_detalle_revisor, id_detalle_dac, id_detalle_comite, id_usuario, id_debilidades, id_criterios, id_unidad, id_ambito_geografico, id_ambito_academico, id_registro, id_carrera, id_facultad, id_procesos, id_impacto, id_estado } = req.body;
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
            id_criterios,
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
                    { 'id_evidencias': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                    { 'nombre_corto_evidencia': { [sequelize_1.Op.like]: `%${searchTerm}%` } },
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
pdfmake_1.default.vfs = vfs_fonts_1.default.pdfMake.vfs;
const generarPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Obtener los detalles de la evidencia por ID
        const evidencia = yield evidencias_1.Evidencias.findByPk(id, {
            include: [{ model: detalle_revisor_1.Detalle_Revisor, as: 'detalle_revisor' }],
        });
        if (!evidencia) {
            return res.status(404).send('Evidencia no encontrada');
        }
        const detalleRevisor = yield detalle_revisor_1.Detalle_Revisor.findOne({
            where: { id_detalle_revisor: evidencia.id_detalle_revisor },
        });
        // Crear la definición del documento PDF
        const documentDefinition = {
            content: [
                { text: `Evidencia ID: ${evidencia.id_evidencias}`, style: 'header' },
                { text: '\nDetalles de la Evidencia:\n\n', style: 'subheader' },
                // Crear una tabla con los datos de la evidencia
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', '*'],
                        body: [
                            ['Campo', 'Valor'],
                            ['Número de Folio', evidencia.numero_folio],
                            ['Correo Usuario', evidencia.correo_usuario],
                            ['Rut Usuario', evidencia.rut_usuario],
                            ['Fecha de evidencia', evidencia.fecha_evidencia.toString()],
                            ['Número de mejoras', evidencia.numero_de_mejoras],
                            ['Descripción', evidencia.descripcion],
                            ['Resultado', evidencia.resultado],
                            ['Almacenamiento', evidencia.almacenamiento],
                            ['Unidades de Personas de Evidencia', evidencia.unidades_personas_evidencias],
                            ['Palabras Claves', evidencia.palabra_clave],
                            ['Nombre Abreviado', evidencia.nombre_corto_evidencia],
                            ['Fecha de Creación', evidencia.fecha_creacion.toString()],
                            ['Fecha de Actualizacion', evidencia.fecha_actualizacion.toString()],
                            ['Asistentes Internos Autoridades', evidencia.asistentes_internos_autoridades],
                            ['Asistentes Internos Administrativos', evidencia.asistentes_internos_administrativos],
                            ['Asistentes Internos Docentes', evidencia.asistentes_internos_docentes],
                            ['Asistentes Internos Estudiantes', evidencia.asistentes_internos_estudiantes],
                            ['Asistentes Externos Autoridades', evidencia.asistentes_externos_autoridades],
                            ['Asistentes Externos Administrativos', evidencia.asistentes_externos_administrativos],
                            ['Asistentes Externos Docentes', evidencia.asistentes_externos_docentes],
                            ['Asistentes Externos Estudiantes', evidencia.asistentes_externos_estudiantes],
                            ['Detalle Revisor', (detalleRevisor === null || detalleRevisor === void 0 ? void 0 : detalleRevisor.comentario_revisor) || 'No disponible'],
                        ],
                    },
                },
            ],
            styles: {
                header: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'center',
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                },
            },
        };
        // Crear el PDF
        const pdfDoc = pdfmake_1.default.createPdf(documentDefinition);
        console.log('Detalle Revisor:', detalleRevisor);
        console.log('Comentario Revisor:', detalleRevisor === null || detalleRevisor === void 0 ? void 0 : detalleRevisor.comentario_revisor);
        // Enviar el PDF como respuesta
        pdfDoc.getBuffer((buffer) => {
            try {
                res.attachment(`evidencia_${id}.pdf`);
                res.type('application/pdf');
                res.end(buffer, 'binary');
            }
            catch (error) {
                console.error('Error', error);
                res.status(500).send('Error interno del servidor');
            }
        });
    }
    catch (error) {
        console.error('Error al generar el PDF', error);
        res.status(500).send('Error interno del servidor');
    }
});
exports.generarPDF = generarPDF;
const getEvidenciasByUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    try {
        const evidenciasUsuario = yield evidencias_1.Evidencias.findAll({
            where: { id_usuario },
        });
        if (!evidenciasUsuario || evidenciasUsuario.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron evidencias para el usuario indicado',
            });
        }
        res.json(evidenciasUsuario);
    }
    catch (error) {
        console.error('Error en el controlador getEvidenciasByUsuario:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.getEvidenciasByUsuario = getEvidenciasByUsuario;
