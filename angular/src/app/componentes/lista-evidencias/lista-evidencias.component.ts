import { Component, OnInit } from '@angular/core';
import { EvidenciasService } from '../../services/evidencias.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { Evidencia } from 'src/app/interfaces/id_evidencia.interface';
import { saveAs } from 'file-saver';
import { Unidad } from "../../interfaces/unidad.interface";
import { UnidadService } from 'src/app/services/unidad.service';
import { AmbitoAcademico } from "../../interfaces/ambito-academico.interface";
import { AmbitoAService } from 'src/app/services/ambito-a.service';
import { Registro } from "../../interfaces/registro.interface";
import { RegistroService } from 'src/app/services/registro.service';
import { Proceso } from "../../interfaces/proceso.interface";
import { ProcesosService } from 'src/app/services/proceso.service';
import { DetalleComite } from 'src/app/interfaces/D_comite.interface';
import { ComiteService } from 'src/app/services/D-comite.service';
import { DetalleDAC } from 'src/app/interfaces/D_dac.interface';
import { DacService } from 'src/app/services/D-dac.service';
import { DetalleRevisor } from 'src/app/interfaces/D_revisor.interface';
import { revisorService } from 'src/app/services/D-revisor.service';



@Component({
  selector: 'app-lista-evidencias',
  templateUrl: './lista-evidencias.component.html',
  styleUrls: ['./lista-evidencias.component.css', '../../../shared-styles.css']
})

export class ListaEvidenciasComponent implements OnInit {
  evidencias: Evidencia[] = [];
  unidades: Unidad[] = [];
  academico: AmbitoAcademico[] = [];
  registro: Registro[] = [];
  proceso: Proceso[] = [];
  Ddac: DetalleComite[] = [];
  Dcomite: DetalleComite[] = [];
  Drevisor: DetalleRevisor[] = [];
  evidenciasOriginal: Evidencia[] | null = null;
  errorMsg: string | undefined;
  sideNavStatus: boolean = false;
  form: FormGroup;
  currentPage: number = 1;
  searchTerm: string = '';
  private evidenciasSubscription!: Subscription;    
  selectedEstado: string | null = null;



  constructor(
    private evidenciasService: EvidenciasService, 
    private toastr: ToastrService,
    private router: Router,
    private sharedService: SharedService,
    private unidadService: UnidadService,
    private ambitoAService: AmbitoAService,
    private registroService: RegistroService,
    private procesoService: ProcesosService,
    private comiteService: ComiteService,
    private dacService: DacService,
    private revisorService: revisorService
    ) 
    {
      this.form = new FormGroup({
        id_evidencias: new FormControl(null, [Validators.required]),
        numero_folio: new FormControl(null, [Validators.required]),
        fecha_evidencia: new FormControl('', [Validators.required]),
        id_detalle_revisor: new FormControl(null, [Validators.required]),
        id_detalle_dac: new FormControl(null, [Validators.required]),
        id_detalle_comite: new FormControl(null, [Validators.required]),
        id_unidad: new FormControl(null, [Validators.required]),
        id_ambito_academico: new FormControl(null, [Validators.required]),
        id_registro: new FormControl(null, [Validators.required]),
        id_procesos: new FormControl(null, [Validators.required]),
      });
    }

    ngOnInit() {
      this.selectedEstado = 'En espera';
      const idUsuario = localStorage.getItem('id_usuario');
      
      if (idUsuario) {
        this.evidenciasService.getEvidenciasByUsuario(+idUsuario).subscribe((evidencias) => {
          if (evidencias && evidencias.length > 0) {
            // Obtener detalles adicionales para cada evidencia
            evidencias.forEach((evidencia) => {
              // Obtener detalles de unidad
              if (evidencia.id_unidad !== undefined) {
                this.unidadService.getUnidad(evidencia.id_unidad).subscribe((unidad) => {
                  evidencia.unidad = unidad?.nombre_unidad || '';
                });
              }
              
              // Obtener detalles de proceso
              if (evidencia.id_procesos !== undefined) {
                this.procesoService.getProcesoById(evidencia.id_procesos).subscribe((proceso) => {
                  evidencia.proceso = proceso?.nombre_procesos || '';
                });
              }
    
              // Obtener detalles de registro
              if (evidencia.id_registro !== undefined) {
                this.registroService.getRegistroById(evidencia.id_registro).subscribe((registro) => {
                  evidencia.registro = registro?.datos_registro || '';
                });
              }
    
              // Obtener detalles de ámbito académico
              if (evidencia.id_ambito_academico !== undefined) {
                this.ambitoAService.getAmbitoAcademico(evidencia.id_ambito_academico).subscribe((ambitoAcademico) => {
                  evidencia.ambitoAcademico = ambitoAcademico?.nombre_ambito_academico || '';
                });
              }

               // Obtener detalles de DAC
              if (evidencia.id_detalle_dac !== undefined) {
                this.dacService.obtenerDacPorId(evidencia.id_detalle_dac).subscribe((detalleDac) => {
                  evidencia.Ddac = detalleDac?.revisado_dac ?? null; 
                });
              }
              
              // Obtener detalles de comité
              if (evidencia.id_detalle_comite !== undefined) {
                this.comiteService.obtenerComitePorId(evidencia.id_detalle_comite).subscribe((detalleComite) => {
                  evidencia.Dcomite = detalleComite?.revisado_comite ?? null;
                });
              }
              
              // Obtener detalles de revisor
              if (evidencia.id_detalle_revisor !== undefined) {
                this.revisorService.obtenerRevisorPorId(evidencia.id_detalle_revisor).subscribe((detalleRevisor) => {
                  evidencia.Drevisor = detalleRevisor?.revisado_revisor ?? null;
                });
              
              
              }
            });
            this.evidencias = evidencias;
          }
        });
      } else {
        console.error('ID de usuario no encontrado en el Local Storage.');
      }
    }
    
    getIconName(state: boolean | DetalleComite | DetalleRevisor | DetalleDAC | null | undefined): string {
      if (state === null) {
        return 'fas fa-question';
      } else if (state === undefined) {
        return 'fas fa-question';
      } else if (Array.isArray(state) && state.length === 0) {
        return 'fas fa-question';
      } else if (state === true) {
        return 'fas fa-user fas fa-check-circle text-success';
      } else if (state === false) {
        return 'fas fa-user fas fa-times-circle text-danger';
      } else {
        return 'fas fa-question'; 
      }
    }
    
    
    
    
    
  
  actualizarEvidencia(id: number | undefined): void {
    if (id !== undefined) {
      console.log('ID a actualizar:', id);
      this.sharedService.setEvidenciaId(id);
      this.router.navigate(['/evidencia']);
    } else {
      console.error('ID de evidencia no definida. No se puede actualizar.');
    }
  }
  

  comienzaConCadena(cadena: string, input: string): boolean {
    if (!cadena || !input) {
      return true; 
    }

    cadena = cadena.toLowerCase();
    input = input.toLowerCase();

    if (!isNaN(Number(input))) {
      return cadena === input;
    } else {
      return cadena.includes(input);
    }
  }

  realizarBusqueda() {
    if (this.selectedEstado === null || this.selectedEstado === undefined) {
      this.evidencias = [...this.evidenciasOriginal!];
      return;
    }
  
    const searchTerm = this.selectedEstado.toString().toLowerCase();
  
    this.evidencias = this.evidenciasOriginal?.filter((evidencia) => {
      const revisadoRevisor = evidencia.Drevisor?.revisado_revisor;
      const revisadoComite = evidencia.Dcomite?.revisado_comite;
      const revisadoDac = evidencia.Ddac?.revisado_dac;
  
      const estadoRevision = this.getEstadoRevision(revisadoRevisor, revisadoComite, revisadoDac);
  
      return estadoRevision.includes(searchTerm);
    }) || [];
  }
  
  getEstadoRevision(revisor: boolean | null | undefined, comite: boolean | null | undefined, dac: boolean | null | undefined): string {
    const estadoRevisor = this.getEstado(revisor);
    const estadoComite = this.getEstado(comite);
    const estadoDac = this.getEstado(dac);
  
    return `${estadoRevisor} - ${estadoDac} - ${estadoComite}`;
  }
  
  getEstado(revisado: boolean | null | undefined): string {
    if (revisado === null || revisado === undefined) {
      return 'En espera';
    } else {
      return revisado ? 'Aprobado' : 'Rechazado';
    }
  }
  
  

  pageChanged(page: number) {
    this.currentPage = page;
  }

  getEvidencias() {
  if (this.evidenciasSubscription) {
    this.evidenciasSubscription.unsubscribe();
  }

  this.evidenciasSubscription = this.evidenciasService.getEvidencias()
    .pipe(
      catchError(error => {
        this.errorMsg = 'Error al obtener la lista de evidencias';
        console.error('Error al obtener la lista de evidencias', error);
        return [];
      })
    )
    .subscribe((data: Evidencia[]) => {
      if (!this.evidenciasOriginal) {
        this.evidenciasOriginal = data;
      }
      
      this.evidencias = data.filter(evidencias => {
        return (
          evidencias.numero_folio?.toString() !== undefined &&
          (
            this.comienzaConCadena(evidencias.numero_folio.toString(), this.searchTerm) 
          )
        );
      });
    });
}

  
  eliminarEvidencia(id: number | undefined) {
    if (id !== undefined) {
        this.realizarOperacionDeEvidencia(() => this.evidenciasService.deleteEvidencia(id), 'Evidencia Eliminada');
    } else {
        console.error('ID de evidencia no definida. No se puede eliminar.');
    }
}

private realizarOperacionDeEvidencia(operacion: () => any, mensajeExitoso: string) {
  operacion().subscribe({
      next: (respuesta: any) => {
          console.log(`${mensajeExitoso} exitosamente`, respuesta);
          this.getEvidencias();
          this.toastr.success(`La evidencia fue ${mensajeExitoso.toLowerCase()} con éxito`, mensajeExitoso);
      },
      error: (error: any) => {
          if (error && error.msg) {
              this.errorMsg = error.msg;
              console.error(`Error al ${mensajeExitoso.toLowerCase()} la evidencia`, error);
          }
      }
  });
}


descargarPDF(id_evidencias: number | undefined): void {
  if (id_evidencias !== undefined) {
    this.evidenciasService.descargarPDF(id_evidencias).subscribe({
      next: (data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'application/pdf' });

        // Usa file-saver para descargar el PDF
        saveAs(blob, `evidencia_${id_evidencias}.pdf`);
      },
      error: (error: any) => {
        console.error('Error al descargar el PDF', error);
      },
    });
  } else {
    console.error('ID de evidencias no definido. No se puede descargar el PDF.');
  }
}



}

  