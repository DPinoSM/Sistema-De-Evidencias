// Importa las dependencias necesarias
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';
import { Evidencias } from './evidencias';  // Asegúrate de importar el modelo Evidencias

// Define la interfaz para las propiedades de Detalle_Revisor
interface DetalleRevisorAttributes {
  id_detalle_revisor: number;
  revisado_revisor: boolean;
  estado_revisor: boolean;
  comentario_revisor: string;
}

// Define la interfaz para las propiedades opcionales de Detalle_Revisor
interface DetalleRevisorCreationAttributes extends Optional<DetalleRevisorAttributes, 'id_detalle_revisor'> {}

// Define la clase Detalle_Revisor extendiendo el modelo y las interfaces
export class Detalle_Revisor
  extends Model<DetalleRevisorAttributes, DetalleRevisorCreationAttributes>
  implements DetalleRevisorAttributes {
  // Definición de propiedades
  public id_detalle_revisor!: number;
  public revisado_revisor!: boolean;
  public estado_revisor!: boolean;
  public comentario_revisor!: string;

  // Agrega una propiedad para la relación
  public evidencia!: Evidencias;
}

// Inicializa el modelo Detalle_Revisor
Detalle_Revisor.init(
  {
    id_detalle_revisor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    revisado_revisor: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    estado_revisor: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    comentario_revisor: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: 'detalle_revisor',
    timestamps: false,
    freezeTableName: true,
  }
);

// Define la relación con Evidencias

// Exporta el modelo Detalle_Revisor
export default Detalle_Revisor;
