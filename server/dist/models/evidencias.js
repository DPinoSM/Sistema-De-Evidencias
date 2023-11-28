"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evidencias = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const unidad_1 = require("./unidad");
const detalle_revisor_1 = require("./detalle_revisor");
const detalle_dac_1 = require("./detalle_dac");
const detalle_comite_1 = require("./detalle_comite");
const user_1 = require("./user");
const debilidades_1 = require("./debilidades");
const ambito_geografico_1 = require("./ambito_geografico");
const ambito_academico_1 = require("./ambito_academico");
const registro_1 = require("./registro");
const carrera_1 = require("./carrera");
const facultad_1 = require("./facultad");
const proceso_1 = require("./proceso");
const impacto_1 = require("./impacto");
const estado_1 = require("./estado");
exports.Evidencias = connection_1.default.define('evidencias', {
    id_evidencias: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    numero_folio: { type: sequelize_1.DataTypes.STRING },
    correo_usuario: { type: sequelize_1.DataTypes.STRING },
    rut_usuario: { type: sequelize_1.DataTypes.INTEGER },
    fecha_evidencia: { type: sequelize_1.DataTypes.DATE },
    numero_de_mejoras: { type: sequelize_1.DataTypes.INTEGER },
    descripcion: { type: sequelize_1.DataTypes.STRING },
    resultado: { type: sequelize_1.DataTypes.STRING },
    almacenamiento: { type: sequelize_1.DataTypes.STRING },
    unidades_personas_evidencias: { type: sequelize_1.DataTypes.INTEGER },
    palabra_clave: { type: sequelize_1.DataTypes.STRING },
    nombre_corto_evidencia: { type: sequelize_1.DataTypes.STRING },
    fecha_creacion: { type: sequelize_1.DataTypes.DATE },
    fecha_actualizacion: { type: sequelize_1.DataTypes.DATE },
    asistentes_internos_autoridades: { type: sequelize_1.DataTypes.INTEGER },
    asistentes_internos_administrativos: { type: sequelize_1.DataTypes.INTEGER },
    asistentes_internos_docentes: { type: sequelize_1.DataTypes.INTEGER },
    asistentes_internos_estudiantes: { type: sequelize_1.DataTypes.INTEGER },
    asistentes_externos_autoridades: { type: sequelize_1.DataTypes.INTEGER },
    asistentes_externos_administrativos: { type: sequelize_1.DataTypes.INTEGER },
    asistentes_externos_docentes: { type: sequelize_1.DataTypes.INTEGER },
    asistentes_externos_estudiantes: { type: sequelize_1.DataTypes.INTEGER },
    archivo_adjunto: { type: sequelize_1.DataTypes.BLOB('long') },
    id_detalle_revisor: { type: sequelize_1.DataTypes.INTEGER },
    id_detalle_dac: { type: sequelize_1.DataTypes.INTEGER },
    id_detalle_comite: { type: sequelize_1.DataTypes.INTEGER },
    id_usuario: { type: sequelize_1.DataTypes.INTEGER },
    id_debilidades: { type: sequelize_1.DataTypes.INTEGER },
    id_unidad: { type: sequelize_1.DataTypes.INTEGER },
    id_ambito_geografico: { type: sequelize_1.DataTypes.INTEGER },
    id_ambito_academico: { type: sequelize_1.DataTypes.INTEGER },
    id_registro: { type: sequelize_1.DataTypes.INTEGER },
    id_carrera: { type: sequelize_1.DataTypes.INTEGER },
    id_facultad: { type: sequelize_1.DataTypes.INTEGER },
    id_procesos: { type: sequelize_1.DataTypes.INTEGER },
    id_impacto: { type: sequelize_1.DataTypes.INTEGER },
    id_estado: { type: sequelize_1.DataTypes.INTEGER },
}, {
    timestamps: false,
    freezeTableName: true,
});
exports.Evidencias.belongsTo(detalle_revisor_1.Detalle_Revisor, { foreignKey: 'id_detalle_revisor' });
exports.Evidencias.belongsTo(detalle_dac_1.Detalle_DAC, { foreignKey: 'id_detalle_dac' });
exports.Evidencias.belongsTo(detalle_comite_1.Detalle_Comite, { foreignKey: 'id_detalle_comite' });
exports.Evidencias.belongsTo(user_1.User, { foreignKey: 'id_usuario' });
exports.Evidencias.belongsTo(debilidades_1.Debilidades, { foreignKey: 'id_debilidades' });
exports.Evidencias.belongsTo(unidad_1.Unidad, { foreignKey: 'id_unidad' });
exports.Evidencias.belongsTo(ambito_geografico_1.AmbitoGeografico, { foreignKey: 'id_ambito_geografico' });
exports.Evidencias.belongsTo(ambito_academico_1.AmbitoAcademico, { foreignKey: 'id_ambito_academico' });
exports.Evidencias.belongsTo(registro_1.Registro, { foreignKey: 'id_registro' });
exports.Evidencias.belongsTo(carrera_1.Carrera, { foreignKey: 'id_carrera' });
exports.Evidencias.belongsTo(facultad_1.Facultad, { foreignKey: 'id_facultad' });
exports.Evidencias.belongsTo(proceso_1.Proceso, { foreignKey: 'id_procesos' });
exports.Evidencias.belongsTo(impacto_1.Impacto, { foreignKey: 'id_impacto' });
exports.Evidencias.belongsTo(estado_1.Estado, { foreignKey: 'id_estado' });
