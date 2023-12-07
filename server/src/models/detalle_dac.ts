// Importa las dependencias necesarias
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';
import { Evidencias } from './evidencias';  // Asegúrate de importar el modelo Evidencias

// Define la interfaz para las propiedades de Detalle_DAC
interface DetalleDACAttributes {
  id_detalle_dac: number;
  revisado_dac: boolean;
  estado_dac: boolean;
  comentario_dac: string;
}

// Define la interfaz para las propiedades opcionales de Detalle_DAC
interface DetalleDACCreationAttributes extends Optional<DetalleDACAttributes, 'id_detalle_dac'> {}

// Define la clase Detalle_DAC extendiendo el modelo y las interfaces
export class Detalle_DAC extends Model<DetalleDACAttributes, DetalleDACCreationAttributes>
  implements DetalleDACAttributes {
  public id_detalle_dac!: number;
  public revisado_dac!: boolean;
  public estado_dac!: boolean;
  public comentario_dac!: string;
}

// Inicializa el modelo Detalle_DAC
Detalle_DAC.init(
  {
    id_detalle_dac: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    revisado_dac: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    estado_dac: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    comentario_dac: { type: DataTypes.STRING },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'detalle_dac', // Asegúrate de incluir el nombre del modelo aquí
  }
);

export default Detalle_DAC;
