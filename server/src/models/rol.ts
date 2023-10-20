import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
export const Rol = sequelize.define('rol',{
    "id_rol": {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    "nombre_rol": {type: DataTypes.STRING}
},
{
    freezeTableName: true,
    timestamps: false,
}
)