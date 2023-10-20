import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const Proceso = sequelize.define("procesos",{
    "id_procesos": {type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    "codigo_procesos": {type: DataTypes.STRING},
    "nombre_procesos": {type: DataTypes.STRING},
    "estado_procesos": {type: DataTypes.BOOLEAN}

},
{
    freezeTableName: true,
    timestamps: false,
}
)