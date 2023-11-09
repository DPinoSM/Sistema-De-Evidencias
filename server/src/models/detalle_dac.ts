import{DataTypes} from "sequelize";
import sequelize from "../db/connection";

export const Detalle_DAC = sequelize.define ('detalle_dac',
    {
        id_detalle_dac: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        revisado_dac: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
        estado_dac: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
        comentario_dac: {type: DataTypes.STRING}
},
{
    freezeTableName: true,
    timestamps: false,
}
)
