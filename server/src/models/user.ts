import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Unidad } from './unidad';
import { Rol } from './rol';
export const User = sequelize.define('usuarios',{
    "id_usuario": {type: DataTypes.INTEGER,primaryKey: true,autoIncrement:true},
    "rut_usuario": {type: DataTypes.STRING},
    "nombre_usuario": {type: DataTypes.STRING},
    "apellido1_usuario": {type: DataTypes.STRING},
    "apellido2_usuario": {type: DataTypes.STRING},
    "clave_usuario": {type: DataTypes.STRING},
    "correo_usuario": {type: DataTypes.STRING},
    "estado_usuario": {type: DataTypes.BOOLEAN},
    "id_rol": {type: DataTypes.INTEGER},
    "id_unidad": {type: DataTypes.INTEGER}
},
{
    timestamps: false,
    freezeTableName: true
});

User.belongsTo(Rol, {foreignKey: 'id_rol'});
User.belongsTo(Unidad, {foreignKey: 'id_unidad'});