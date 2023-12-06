// evidencias.d.ts

import { Model, Optional, DataTypes } from 'sequelize';

interface EvidenciaAttributes {
  id_evidencias: number;
  numero_folio: string;
  correo_usuario: string;
  rut_usuario: number;
  fecha_evidencia: Date;
  numero_de_mejoras: number;
  descripcion: string;
  resultado: string;
  almacenamiento: string;
  unidades_personas_evidencias: number;
  palabra_clave: string;
  nombre_corto_evidencia: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  asistentes_internos_autoridades: number;
  asistentes_internos_administrativos: number;
  asistentes_internos_docentes: number;
  asistentes_internos_estudiantes: number;
  asistentes_externos_autoridades: number;
  asistentes_externos_administrativos: number;
  asistentes_externos_docentes: number;
  asistentes_externos_estudiantes: number;
  archivo_adjunto: Buffer;
  id_detalle_revisor: number;
  id_detalle_dac: number;
  id_detalle_comite: number;
  id_usuario: number;
  id_debilidades: number;
  id_criterios: number;
  id_unidad: number;
  id_ambito_geografico: number;
  id_ambito_academico: number;
  id_registro: number;
  id_carrera: number;
  id_facultad: number;
  id_procesos: number;
  id_impacto: number;
  id_estado: number;
}

interface EvidenciaCreationAttributes extends Optional<EvidenciaAttributes, 'id_evidencias'> {}

export interface EvidenciaInstance
  extends Model<EvidenciaAttributes, EvidenciaCreationAttributes>,
    EvidenciaAttributes {}

export default EvidenciaInstance;
