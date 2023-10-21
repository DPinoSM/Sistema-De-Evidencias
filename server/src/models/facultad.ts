import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
export const Facultad = sequelize.define('facultad',{
    "id_facultad": {type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
    "nombre_facultad": {type: DataTypes.STRING},
    "telefono_facultad": {type: DataTypes.INTEGER}
},
{
    freezeTableName: true,
    timestamps: false,
}
)