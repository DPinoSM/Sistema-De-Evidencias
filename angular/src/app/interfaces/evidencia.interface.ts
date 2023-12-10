import { User } from "./usuario.interface";
import { Debilidad } from "./debilidades.interface";
import { Criterio } from "./criterio.interface";
import { Unidad } from "./unidad.interface";
import { AmbitoGeografico } from "./ambito-geografico.interface";
import { AmbitoAcademico } from "./ambito-academico.interface";
import { Registro } from "./registro.interface";
import { Carrera } from "./carrera.interface";
import { Facultad } from "./facultad.interface";
import { Proceso } from "./proceso.interface";
import { Impacto } from "./impacto.interface";
import { Estado } from "./estado.interface";
import { DetalleDAC } from "./D_dac.interface";
import { DetalleComite } from "./D_comite.interface";
import { DetalleRevisor } from "./D_revisor.interface";


export interface Evidencia {
  id_evidencias?: number;
  numero_folio?: string;
  fecha_evidencia?: Date;
  rut_usuario?: number;
  correo_usuario?: string;
  usuario?: User;
  unidad?: Unidad;
  proceso?: Proceso;
  registro?: Registro;
  numero_de_mejoras?: number;
  ambito_academico?: AmbitoAcademico;
  ambito_geografico?: AmbitoGeografico;
  criterio?: Criterio;
  debilidad?: Debilidad;
  carrera?: Carrera;
  facultad?: Facultad;
  impacto?: Impacto;
  estado?: Estado;
  ddac?: DetalleDAC;
  dcomite?: DetalleComite;
  drevisor?: DetalleRevisor;
  descripcion?: string;
  resultado?: string;
  almacenamiento?: string;
  unidades_personas_evidencias?: number;
  palabra_clave?: string;
  nombre_corto_evidencia?: string;
  asistentes_interno_autoridades?: number;
  asistentes_interno_administrativos?: number;
  asistentes_interno_docentes?: number;
  asistentes_interno_estudiantes?: number;
  asistentes_externo_autoridades?: number;
  asistentes_externo_administrativos?: number;
  asistentes_externo_docentes?: number;
  asistentes_externo_estudiantes?: number;
  archivo_adjunto?: Uint8Array | null;

}