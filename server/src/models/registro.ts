import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
export const Registro = sequelize.define('registro',{
    "id_registro": {type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true},
    "datos_registro": {type: DataTypes.STRING},
    "contenido_registro": {type: DataTypes.STRING}
},
{
    freezeTableName: true,
    timestamps: false,
}
)