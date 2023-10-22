import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
export const Impacto = sequelize.define('impacto',{
    "id_impacto": {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    "interno_externo": {type: DataTypes.BOOLEAN}
},
{
    freezeTableName: true,
    timestamps: false,
}
)