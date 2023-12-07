import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';
import { Criterio } from './criterio';

// Define la interfaz para las propiedades de Debilidades
interface DebilidadesAttributes {
  id_debilidades: number;
  descripcion_debilidades: string;
  estado_debilidades: boolean;
  id_criterios: number;
}

// Define la interfaz para las propiedades opcionales de Debilidades
interface DebilidadesCreationAttributes extends Optional<DebilidadesAttributes, 'id_debilidades'> {}

// Define la clase Debilidades extendiendo el modelo y las interfaces
export class Debilidades extends Model<DebilidadesAttributes, DebilidadesCreationAttributes>
  implements DebilidadesAttributes {
  // Definición de propiedades
  public id_debilidades!: number;
  public descripcion_debilidades!: string;
  public estado_debilidades!: boolean;
  public id_criterios!: number;

  // Agrega una propiedad para la relación
  public criterio!: typeof Criterio; // Corregir aquí

  // ...
}

// Inicializa el modelo Debilidades
Debilidades.init(
  {
    id_debilidades: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion_debilidades: { type: DataTypes.STRING },
    estado_debilidades: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    id_criterios: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName: 'debilidades',
    timestamps: false,
    freezeTableName: true,
  }
);

// Establece la relación entre la clave primaria
Debilidades.belongsTo(Criterio, { foreignKey: 'id_criterios' });

// Exporta el modelo Debilidades
export default Debilidades;
