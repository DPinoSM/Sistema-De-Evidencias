import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';

// Define la interfaz para las propiedades de Estado
interface EstadoAttributes {
  id_estado: number;
  online_presencial: string;
}

// Define la interfaz para las propiedades opcionales de Estado
interface EstadoCreationAttributes extends Optional<EstadoAttributes, 'id_estado'> {}

// Define la clase Estado extendiendo el modelo y las interfaces
export class Estado extends Model<EstadoAttributes, EstadoCreationAttributes> implements EstadoAttributes {
  // Definición de propiedades
  public id_estado!: number;
  public online_presencial!: string;

  // ...
}

// Inicializa el modelo Estado
Estado.init(
  {
    id_estado: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    online_presencial: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: 'estado',
    timestamps: false,
    freezeTableName: true,
  }
);

// Exporta el modelo Estado
export default Estado;
