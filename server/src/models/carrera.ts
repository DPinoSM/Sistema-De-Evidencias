import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';

// Define la interfaz para las propiedades de Carrera
interface CarreraAttributes {
  id_carrera: number;
  nombre_carrera: string;
  area: string;
  cantidad_matriculados: number;
}

// Define la interfaz para las propiedades opcionales de Carrera
interface CarreraCreationAttributes extends Optional<CarreraAttributes, 'id_carrera'> {}

// Define la clase Carrera extendiendo el modelo y las interfaces
export class Carrera extends Model<CarreraAttributes, CarreraCreationAttributes> implements CarreraAttributes {
  // Definición de propiedades
  public id_carrera!: number;
  public nombre_carrera!: string;
  public area!: string;
  public cantidad_matriculados!: number;

  // ...
}

// Inicializa el modelo Carrera
Carrera.init(
  {
    id_carrera: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_carrera: { type: DataTypes.STRING },
    area: { type: DataTypes.STRING },
    cantidad_matriculados: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName: 'carrera',
    timestamps: false,
    freezeTableName: true,
  }
);

// Exporta el modelo Carrera
export default Carrera;
