import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';

// Define la interfaz para las propiedades de Unidad
interface UnidadAttributes {
  id_unidad: number;
  nombre_unidad: string;
  unidad_defecto: boolean;
}

// Define la interfaz para las propiedades opcionales de Unidad
interface UnidadCreationAttributes extends Optional<UnidadAttributes, 'id_unidad'> {}

// Define la clase Unidad extendiendo el modelo y las interfaces
export class Unidad extends Model<UnidadAttributes, UnidadCreationAttributes>
  implements UnidadAttributes {
  // Definición de propiedades
  public id_unidad!: number;
  public nombre_unidad!: string;
  public unidad_defecto!: boolean;

  // ...
}

// Inicializa el modelo Unidad
Unidad.init(
  {
    id_unidad: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_unidad: { type: DataTypes.STRING },
    unidad_defecto: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    sequelize,
    modelName: 'unidad',
    timestamps: false,
    freezeTableName: true,
  }
);

// Exporta el modelo Unidad
export default Unidad;
