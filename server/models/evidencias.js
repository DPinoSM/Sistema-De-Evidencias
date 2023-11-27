'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evidencias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Evidencias.init({
    id_evidencias: DataTypes.INTEGER,
    numero_folio: DataTypes.STRING,
    fecha_evidencia: DataTypes.DATE,
    numero_de_mejoras: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    resultado: DataTypes.STRING,
    almacenamiento: DataTypes.STRING,
    unidades_personas_evidencia: DataTypes.STRING,
    palabra_clave: DataTypes.STRING,
    nombre_corto_evidencia: DataTypes.STRING,
    fecha_creacion: DataTypes.DATE,
    fecha_Actualizacion: DataTypes.DATE,
    id_detalle_revisor_evidencias: DataTypes.INTEGER,
    id_detalle_dac_evidencias: DataTypes.INTEGER,
    id_detalle_comite_evidencias: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER,
    id_debilidades: DataTypes.INTEGER,
    id_unidad: DataTypes.INTEGER,
    id_ambito_geografico: DataTypes.INTEGER,
    id_ambito_academico: DataTypes.INTEGER,
    id_registros: DataTypes.INTEGER,
    id_carrera: DataTypes.INTEGER,
    id_facultad: DataTypes.INTEGER,
    id_procesos: DataTypes.INTEGER,
    id_impacto: DataTypes.INTEGER,
    id_estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Evidencias',
  });
  return Evidencias;
};