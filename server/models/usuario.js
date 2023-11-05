'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init({
    id_usuario: DataTypes.INTEGER,
    rut_usuario: DataTypes.STRING,
    nombre_usuario: DataTypes.STRING,
    apellido1_usuario: DataTypes.STRING,
    apellido2_usuario: DataTypes.STRING,
    clave_usuario: DataTypes.STRING,
    correo_usuario: DataTypes.STRING,
    estado_usuario: DataTypes.BOOLEAN,
    id_rol: DataTypes.INTEGER,
    id_unidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};