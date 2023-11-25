import{DataTypes} from "sequelize";
import sequelize from "../db/connection";

export const Detalle_Comite = sequelize.define ('detalle_comite',
    {
        id_detalle_comite: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        revisado_comite: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
        estado_comite: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
        comentario_comite: {type: DataTypes.STRING}
},
{
    freezeTableName: true,
    timestamps: false,
}
)