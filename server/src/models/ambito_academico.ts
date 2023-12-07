import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';

// Define la interfaz para las propiedades de AmbitoAcademico
interface AmbitoAcademicoAttributes {
  id_ambito_academico: number;
  nombre_ambito_academico: string;
  estado_ambito_academico: boolean;
}

// Define la interfaz para las propiedades opcionales de AmbitoAcademico
interface AmbitoAcademicoCreationAttributes extends Optional<AmbitoAcademicoAttributes, 'id_ambito_academico'> {}

// Define la clase AmbitoAcademico extendiendo el modelo y las interfaces
export class AmbitoAcademico extends Model<AmbitoAcademicoAttributes, AmbitoAcademicoCreationAttributes>
  implements AmbitoAcademicoAttributes {
  // Definición de propiedades
  public id_ambito_academico!: number;
  public nombre_ambito_academico!: string;
  public estado_ambito_academico!: boolean;

  // ...
}

// Inicializa el modelo AmbitoAcademico
AmbitoAcademico.init(
  {
    id_ambito_academico: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_ambito_academico: { type: DataTypes.STRING },
    estado_ambito_academico: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    sequelize,
    modelName: 'ambito_academico',
    timestamps: false,
    freezeTableName: true,
  }
);

// Exporta el modelo AmbitoAcademico
export default AmbitoAcademico;
