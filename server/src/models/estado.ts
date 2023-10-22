import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
export const Estado = sequelize.define('estado',{
    "id_estado": {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    "online_presencial": {type: DataTypes.BOOLEAN}
},
{
    freezeTableName: true,
    timestamps: false,
}
)