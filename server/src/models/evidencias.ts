import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Unidad } from './unidad';
import { Detalle_Revisor } from './detalle_revisor';
import { Detalle_DAC } from './detalle_dac';
import { Detalle_Comite } from './detalle_comite';
import { User } from './user';
import { Debilidades } from './debilidades';
import { AmbitoGeografico } from './ambito_geografico';
import { AmbitoAcademico } from './ambito_academico';
import { Registro } from './registro';
import { Carrera } from './carrera';
import { Facultad } from './facultad';
import { Proceso } from './proceso';
import { Impacto } from './impacto';
import { Estado } from './estado';

export const Evidencias = sequelize.define(
    'evidencias',
    {
        id_evidencias: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        numero_folio: { type: DataTypes.STRING },
        fecha_evidencia: { type: DataTypes.DATE },
        numero_de_mejoras: { type: DataTypes.INTEGER },
        descripcion: { type: DataTypes.STRING },
        resultado: { type: DataTypes.STRING },
        almacenamiento: { type: DataTypes.STRING },
        unidades_personas_evidencias: { type: DataTypes.INTEGER },
        palabra_clave: { type: DataTypes.STRING },
        nombre_corto_evidencia: { type: DataTypes.STRING },
        fecha_creacion: { type: DataTypes.DATE},
        fecha_actualizacion: {type: DataTypes.DATE},
        id_detalle_revisor: {type: DataTypes.INTEGER},
        id_detalle_dac: {type: DataTypes.INTEGER},
        id_detalle_comite: {type: DataTypes.INTEGER},
        id_usuario: {type: DataTypes.INTEGER},
        id_debilidades: {type: DataTypes.INTEGER},
        id_unidad: {type: DataTypes.INTEGER},
        id_ambito_geografico: {type: DataTypes.INTEGER},
        id_ambito_academico: {type: DataTypes.INTEGER},
        id_registro: {type: DataTypes.INTEGER},
        id_carrera: {type: DataTypes.INTEGER},
        id_facultad: {type: DataTypes.INTEGER},
        id_procesos: {type: DataTypes.INTEGER},
        id_impacto: {type: DataTypes.INTEGER},
        id_estado: {type: DataTypes.INTEGER},
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

Evidencias.belongsTo(Detalle_Revisor, {foreignKey: 'id_detalle_revisor'});
Evidencias.belongsTo(Detalle_DAC, {foreignKey: 'id_detalle_dac'});
Evidencias.belongsTo(Detalle_Comite, {foreignKey: 'id_detalle_comite'});
Evidencias.belongsTo(User, {foreignKey: 'id_usuario'});
Evidencias.belongsTo(Debilidades, {foreignKey: 'id_debilidades'});
Evidencias.belongsTo(Unidad, { foreignKey: 'id_unidad' });
Evidencias.belongsTo(AmbitoGeografico, {foreignKey: 'id_ambito_geografico'});
Evidencias.belongsTo(AmbitoAcademico, {foreignKey: 'id_ambito_academico'});
Evidencias.belongsTo(Registro, {foreignKey: 'id_registro'});
Evidencias.belongsTo(Carrera, {foreignKey: 'id_carrera'});
Evidencias.belongsTo(Facultad, {foreignKey: 'id_facultad'});
Evidencias.belongsTo(Proceso, {foreignKey: 'id_procesos'});
Evidencias.belongsTo(Impacto, {foreignKey: 'id_impacto'});
Evidencias.belongsTo(Estado, {foreignKey: 'id_estado'});
