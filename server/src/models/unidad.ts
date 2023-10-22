import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
export const Unidad = sequelize.define('unidad',{
    "id_unidad": {type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
    "nombre_unidad": {type: DataTypes.STRING},
    "unidad_defecto": {type: DataTypes.BOOLEAN,allowNull: false, defaultValue: false}
},
{
    freezeTableName: true,
    timestamps: false,
}
)