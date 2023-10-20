import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const AmbitoAcademico = sequelize.define("ambito_academico",{
    "id_ambito_academico": {type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    "nombre_ambito_academico": {type: DataTypes.STRING},
    "Estado_ambito_academico": {type: DataTypes.BOOLEAN}

},
{
    freezeTableName: true,
    timestamps: false,
}
)