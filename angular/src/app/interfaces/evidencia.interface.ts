import { DetalleRevisor } from "./D_revisor.interface";
import { DetalleDAC } from "./D_dac.interface";
import { DetalleComite } from "./D_comite.interface";
import { User } from "./usuario.interface";
import { Debilidad } from "./debilidades.interface";
import { Unidad } from "./unidad.interface";
import { AmbitoGeografico } from "./ambito-geografico.interface";
import { AmbitoAcademico } from "./ambito-academico.interface";
import { Registro } from "./registro.interface";
import { Carrera } from "./carrera.interface";
import { Facultad } from "./facultad.interface";
import { Proceso } from "./proceso.interface";
import { Impacto } from "./impacto.interface";
import { Estado } from "./estado.interface";

export interface Evidencia {
    id_evidencias?: number;
    numero_folio?: string;
    fecha_evidencia?: Date;
    numero_de_mejoras?: number;
    descripcion?: string;
    resultado?: string;
    almacenamiento?: string;
    unidades_personas_evidencias?: number;
    palabra_clave?: string;
    nombre_corto_evidencia?: string;
    fecha_creacion?: Date;
    fecha_actualizacion?: Date;
    detalle_revisor: DetalleRevisor;
    detalle_dac?: DetalleDAC;
    detalle_comite?: DetalleComite;
    usuario: User;
    debilidades?: Debilidad;
    unidad?: Unidad;
    ambito_geografico?: AmbitoGeografico;
    ambito_academico?: AmbitoAcademico;
    registro?: Registro;
    carrera?: Carrera;
    facultad?: Facultad;
    procesos?: Proceso;
    impacto?: Impacto;
    estado?: Estado;
  }
  