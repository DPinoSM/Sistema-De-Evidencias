import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';

// Define la interfaz para las propiedades de Criterio
interface CriterioAttributes {
  id_criterios: number;
  nombre_criterios: string;
  codigo_criterios: number;
  descripcion_criterios: string;
  estado_criterios: boolean;
}

// Define la interfaz para las propiedades opcionales de Criterio
interface CriterioCreationAttributes extends Optional<CriterioAttributes, 'id_criterios'> {}

// Define la clase Criterio extendiendo el modelo y las interfaces
export class Criterio extends Model<CriterioAttributes, CriterioCreationAttributes>
  implements CriterioAttributes {
  // Definición de propiedades
  public id_criterios!: number;
  public nombre_criterios!: string;
  public codigo_criterios!: number;
  public descripcion_criterios!: string;
  public estado_criterios!: boolean;

  // ...
}

// Inicializa el modelo Criterio
Criterio.init(
  {
    id_criterios: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_criterios: { type: DataTypes.STRING },
    codigo_criterios: { type: DataTypes.INTEGER },
    descripcion_criterios: { type: DataTypes.STRING },
    estado_criterios: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    sequelize,
    modelName: 'criterios',
    timestamps: false,
    freezeTableName: true,
  }
);

// Exporta el modelo Criterio
export default Criterio;
