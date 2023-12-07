import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';

// Define la interfaz para las propiedades de Facultad
interface FacultadAttributes {
  id_facultad: number;
  nombre_facultad: string;
}

// Define la interfaz para las propiedades opcionales de Facultad
interface FacultadCreationAttributes extends Optional<FacultadAttributes, 'id_facultad'> {}

// Define la clase Facultad extendiendo el modelo y las interfaces
export class Facultad extends Model<FacultadAttributes, FacultadCreationAttributes> implements FacultadAttributes {
  // Definición de propiedades
  public id_facultad!: number;
  public nombre_facultad!: string;

  // ...
}

// Inicializa el modelo Facultad
Facultad.init(
  {
    id_facultad: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_facultad: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: 'facultad',
    timestamps: false,
    freezeTableName: true,
  }
);

// Exporta el modelo Facultad
export default Facultad;
