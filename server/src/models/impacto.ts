import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';

// Define la interfaz para las propiedades de Impacto
interface ImpactoAttributes {
  id_impacto: number;
  interno_externo: string;
}

// Define la interfaz para las propiedades opcionales de Impacto
interface ImpactoCreationAttributes extends Optional<ImpactoAttributes, 'id_impacto'> {}

// Define la clase Impacto extendiendo el modelo y las interfaces
export class Impacto extends Model<ImpactoAttributes, ImpactoCreationAttributes> implements ImpactoAttributes {
  // Definición de propiedades
  public id_impacto!: number;
  public interno_externo!: string;

  // ...
}

// Inicializa el modelo Impacto
Impacto.init(
  {
    id_impacto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    interno_externo: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: 'impacto',
    timestamps: false,
    freezeTableName: true,
  }
);

// Exporta el modelo Impacto
export default Impacto;
