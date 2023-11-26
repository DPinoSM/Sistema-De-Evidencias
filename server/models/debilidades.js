'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Debilidades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Debilidades.init({
    id_debilidades: DataTypes.INTEGER,
    descripcion_debilidades: DataTypes.STRING,
    estado_debilidades: DataTypes.BOOLEAN,
    id_criterios: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Debilidades',
  });
  return Debilidades;
};