import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
export const Criterio = sequelize.define('criterio',{
    "id_criterios": {type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
    "nombre_criterios": {type: DataTypes.STRING},
    "codigo_criterios": {type: DataTypes.INTEGER},
    "descripcion_criterios": {type: DataTypes.STRING},
    "estado_criterios": {type: DataTypes.BOOLEAN}
},
{
    freezeTableName: true,
    timestamps: false,
}
)