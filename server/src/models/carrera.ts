import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
export const Carrera = sequelize.define('carrera',{
    "id_carrera": {type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
    "nombre_carrera": {type: DataTypes.STRING},
    "area": {type: DataTypes.STRING},
    "cantidad_matriculados": {type: DataTypes.INTEGER}
},
{
    freezeTableName: true,
    timestamps: false,
}
)