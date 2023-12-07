import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';

// Define la interfaz para las propiedades de Proceso
interface ProcesoAttributes {
  id_procesos: number;
  codigo_procesos: string;
  nombre_procesos: string;
  estado_procesos: boolean;
}

// Define la interfaz para las propiedades opcionales de Proceso
interface ProcesoCreationAttributes extends Optional<ProcesoAttributes, 'id_procesos'> {}

// Define la clase Proceso extendiendo el modelo y las interfaces
export class Proceso extends Model<ProcesoAttributes, ProcesoCreationAttributes> implements ProcesoAttributes {
  // Definición de propiedades
  public id_procesos!: number;
  public codigo_procesos!: string;
  public nombre_procesos!: string;
  public estado_procesos!: boolean;

  // ...
}

// Inicializa el modelo Proceso
Proceso.init(
  {
    id_procesos: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    codigo_procesos: { type: DataTypes.STRING },
    nombre_procesos: { type: DataTypes.STRING },
    estado_procesos: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    sequelize,
    modelName: 'procesos',
    timestamps: false,
    freezeTableName: true,
  }
);

// Exporta el modelo Proceso
export default Proceso;
