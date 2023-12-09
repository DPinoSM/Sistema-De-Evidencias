// Importa las dependencias necesarias
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';
import { Evidencias } from './evidencias';  // Asegúrate de importar el modelo Evidencias

// Define la interfaz para las propiedades de Detalle_Comite
interface DetalleComiteAttributes {
  id_detalle_comite: number;
  revisado_comite: boolean;
  estado_comite: boolean;
  comentario_comite: string;
}

// Define la interfaz para las propiedades opcionales de Detalle_Comite
interface DetalleComiteCreationAttributes extends Optional<DetalleComiteAttributes, 'id_detalle_comite'> {}

// Define la clase Detalle_Comite extendiendo el modelo y las interfaces
export class Detalle_Comite extends Model<DetalleComiteAttributes, DetalleComiteCreationAttributes>
  implements DetalleComiteAttributes {
  public id_detalle_comite!: number;
  public revisado_comite!: boolean;
  public estado_comite!: boolean;
  public comentario_comite!: string;
}

// Inicializa el modelo Detalle_Comite
Detalle_Comite.init(
  {
    id_detalle_comite: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true },
    revisado_comite: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    estado_comite: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    comentario_comite: { type: DataTypes.STRING },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'detalle_comite', // Asegúrate de incluir el nombre del modelo aquí
  }
);


// Exporta el modelo Detalle_Comite
export default Detalle_Comite;
