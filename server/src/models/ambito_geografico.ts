import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';

// Define la interfaz para las propiedades de AmbitoGeografico
interface AmbitoGeograficoAttributes {
  id_ambito_geografico: number;
  nombre_ambito_geografico: string;
  estado_ambito_geografico: boolean;
}

// Define la interfaz para las propiedades opcionales de AmbitoGeografico
interface AmbitoGeograficoCreationAttributes extends Optional<AmbitoGeograficoAttributes, 'id_ambito_geografico'> {}

// Define la clase AmbitoGeografico extendiendo el modelo y las interfaces
export class AmbitoGeografico extends Model<AmbitoGeograficoAttributes, AmbitoGeograficoCreationAttributes>
  implements AmbitoGeograficoAttributes {
  // Definición de propiedades
  public id_ambito_geografico!: number;
  public nombre_ambito_geografico!: string;
  public estado_ambito_geografico!: boolean;

  // ...
}

// Inicializa el modelo AmbitoGeografico
AmbitoGeografico.init(
  {
    id_ambito_geografico: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_ambito_geografico: { type: DataTypes.STRING },
    estado_ambito_geografico: { type: DataTypes.BOOLEAN },
  },
  {
    sequelize,
    modelName: 'ambito_geografico',
    timestamps: false,
    freezeTableName: true,
  }
);

// Exporta el modelo AmbitoGeografico
export default AmbitoGeografico;
