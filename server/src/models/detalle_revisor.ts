//JONATHAN MOLINA 
//MODELS DETALLE REVISOR
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
export const Detalle_Revisor = sequelize.define(
    'detalle_revisor',
    {
        id_detalle_revisor: {type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
        revisado_revisor: {type: DataTypes.BOOLEAN,allowNull: false, defaultValue: false},
        estado_revisor: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: false},
        comentario_revisor: {type: DataTypes.STRING}
},
{
    freezeTableName: true,
    timestamps: false,
}
)
