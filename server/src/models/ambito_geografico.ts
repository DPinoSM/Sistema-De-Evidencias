import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const AmbitoGeografico = sequelize.define("ambito_geografico",{
    "id_ambito_geografico": {type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    "nombre_ambito_geografico": {type: DataTypes.STRING},
    "estado_ambito_geografico": {type: DataTypes.BOOLEAN}
},
{
    freezeTableName: true,
    timestamps: false,
}
)