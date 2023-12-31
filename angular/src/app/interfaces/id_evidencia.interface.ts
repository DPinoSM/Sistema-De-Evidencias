import { Unidad } from "./unidad.interface";
import { Proceso } from "./proceso.interface";
import { Registro } from "./registro.interface";
import { AmbitoAcademico } from "./ambito-academico.interface";
import { DetalleDAC } from "./D_dac.interface";
import { DetalleComite } from "./D_comite.interface";
import { DetalleRevisor } from "./D_revisor.interface";

export interface Evidencia {
  id_evidencias?: number;
  numero_folio?: string;
  fecha_evidencia?: Date;
  id_unidad?: number;
  id_procesos?: number;
  id_ambito_academico?: number;
  id_registro?: number;
  id_detalle_dac?: number | null;
  id_detalle_comite?: number | null;
  id_detalle_revisor?: number | null;
  unidad?: Unidad;
  proceso?: Proceso;
  registro?: Registro;
  ambitoAcademico?: AmbitoAcademico;
  Ddac?: DetalleDAC;
  Dcomite?: DetalleComite;
  Drevisor?: DetalleRevisor;
  selectedEstado?: string;
  iconoDdac: string;
  iconoDcomite: string;
  iconoDrevisor: string;
}
