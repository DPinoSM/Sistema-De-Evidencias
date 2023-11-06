//JONATHAN MOLINA 
//MODELS DEBILIDADES
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Criterio } from './criterio';
export const Debilidades = sequelize.define('debilidades',{
    "id_debilidades":{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    "descripcion_debilidades":{
        type: DataTypes.STRING(70)
    },
    "estado_debilidades":{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    "id_criterios":{
        type:DataTypes.INTEGER
    }
},
{
    freezeTableName:true,
    timestamps:false,
}
)
//Establece la relación entre la clave primaria 
Debilidades.belongsTo(Criterio, {foreignKey: 'id_criterios'});

//FIN