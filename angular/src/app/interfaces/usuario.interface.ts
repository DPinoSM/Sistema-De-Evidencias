import { Rol } from './rol.interface';
import { Unidad } from './unidad.interface';

export interface User {
  id_usuario: number;
  rut_usuario: number;
  nombre_usuario: string;
  apellido1_usuario: string;
  apellido2_usuario: string;
  clave_usuario: string,
  correo_usuario: string;
  estado_usuario: string;
  rol: Rol; 
  unidad: Unidad; 
}