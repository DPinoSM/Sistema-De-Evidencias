import { Criterio } from "./criterio.interface";

export interface Debilidad {
    id_debilidades: number;
    descripcion_debilidades: string;
    estado_debilidades: boolean;
    criterio: Criterio;
  }