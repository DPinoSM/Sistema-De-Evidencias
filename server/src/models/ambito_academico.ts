import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const AmbitoAcademico = sequelize.define("ambito_academico",{
    "id_ambito_academico": {type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    "nombre_ambito_academico": {type: DataTypes.STRING},
    "estado_ambito_academico": {type: DataTypes.BOOLEAN,allowNull: false, defaultValue: false }

},
{
    freezeTableName: true,
    timestamps: false,
    
}
)