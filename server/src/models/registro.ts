import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';

// Define la interfaz para las propiedades de Registro
interface RegistroAttributes {
  id_registro: number;
  datos_registro: string;
  contenido_registro: string;
}

// Define la interfaz para las propiedades opcionales de Registro
interface RegistroCreationAttributes extends Optional<RegistroAttributes, 'id_registro'> {}

// Define la clase Registro extendiendo el modelo y las interfaces
export class Registro extends Model<RegistroAttributes, RegistroCreationAttributes> implements RegistroAttributes {
  // Definición de propiedades
  public id_registro!: number;
  public datos_registro!: string;
  public contenido_registro!: string;

  // ...
}

// Inicializa el modelo Registro
Registro.init(
  {
    id_registro: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    datos_registro: { type: DataTypes.STRING },
    contenido_registro: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: 'registro',
    timestamps: false,
    freezeTableName: true,
  }
);

// Exporta el modelo Registro
export default Registro;
