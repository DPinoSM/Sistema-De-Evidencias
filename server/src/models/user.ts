// Importa las dependencias necesarias
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';
import { Rol } from './rol';
import { Unidad } from './unidad';

// Define la interfaz para las propiedades de User
interface UserAttributes {
  id_usuario: number;
  rut_usuario: number;
  nombre_usuario: string;
  apellido1_usuario: string;
  apellido2_usuario: string;
  clave_usuario: string;
  correo_usuario: string;
  estado_usuario: boolean;
  id_rol: number;
  id_unidad: number;
}

// Define la interfaz para las propiedades opcionales de User
interface UserCreationAttributes extends Optional<UserAttributes, 'id_usuario'> {}

// Define la clase User extendiendo el modelo y las interfaces
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id_usuario!: number;
  public rut_usuario!: number;
  public nombre_usuario!: string;
  public apellido1_usuario!: string;
  public apellido2_usuario!: string;
  public clave_usuario!: string;
  public correo_usuario!: string;
  public estado_usuario!: boolean;
  public id_rol!: number;
  public id_unidad!: number;
}

// Inicializa el modelo User
User.init(
  {
    id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rut_usuario: { type: DataTypes.INTEGER },
    nombre_usuario: { type: DataTypes.STRING },
    apellido1_usuario: { type: DataTypes.STRING },
    apellido2_usuario: { type: DataTypes.STRING },
    clave_usuario: { type: DataTypes.STRING },
    correo_usuario: { type: DataTypes.STRING },
    estado_usuario: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    id_rol: { type: DataTypes.INTEGER },
    id_unidad: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'usuarios', // Asegúrate de incluir el nombre del modelo aquí
  }
);

// Define las relaciones
User.belongsTo(Rol, { foreignKey: 'id_rol' });
User.belongsTo(Unidad, { foreignKey: 'id_unidad' });

// Exporta el modelo User
export default User;

