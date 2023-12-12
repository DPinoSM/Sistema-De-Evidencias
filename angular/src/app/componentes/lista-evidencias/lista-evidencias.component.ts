import { Component, OnInit } from '@angular/core';
import { EvidenciasService } from '../../services/evidencias.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Subscription, forkJoin, map } from 'rxjs';
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
  id_usuario: number | undefined;
  errorMsg: string | undefined;
  sideNavStatus: boolean = false;
  form: FormGroup;
  currentPage: number = 1;
  searchTerm: string = '';
  private evidenciasSubscription!: Subscription;    
  selectedEstado: string = '';




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
      this.cargarEvidencias();
    }

    private actualizarDetalles(evidencias: any[]): void {
      const observables = evidencias.map((evidencia) => {
        const detallesObservables = [];
    
        if (evidencia.id_unidad !== undefined) {
          detallesObservables.push(this.unidadService.getUnidad(evidencia.id_unidad));
        }
    
        // Obtener detalles de proceso
        if (evidencia.id_procesos !== undefined) {
          detallesObservables.push(this.procesoService.getProcesoById(evidencia.id_procesos));
        }

        // Obtener detalles de registro
        if (evidencia.id_registro !== undefined) {
          detallesObservables.push(this.registroService.getRegistroById(evidencia.id_registro));
        }

        // Obtener detalles de ámbito académico
        if (evidencia.id_ambito_academico !== undefined) {
          detallesObservables.push(this.ambitoAService.getAmbitoAcademico(evidencia.id_ambito_academico));
        }

        // Obtener detalles de DAC
        if (evidencia.id_detalle_dac !== undefined && evidencia.id_detalle_dac !== null) {
          detallesObservables.push(this.dacService.obtenerDacPorId(evidencia.id_detalle_dac));
        }

        // Obtener detalles de comité
        if (evidencia.id_detalle_comite !== undefined && evidencia.id_detalle_comite !== null) {
          detallesObservables.push(this.comiteService.obtenerComitePorId(evidencia.id_detalle_comite));
        }

        // Obtener detalles de revisor
        if (evidencia.id_detalle_revisor !== undefined && evidencia.id_detalle_revisor !== null) {
          detallesObservables.push(this.revisorService.obtenerRevisorPorId(evidencia.id_detalle_revisor));
        }
    
        return forkJoin(detallesObservables).pipe(
          map((detalles) => {
            if (detalles[0]) {
              evidencia.unidad = detalles[0]?.nombre_unidad || '';
            }
        
            if (detalles[1]) {
              evidencia.proceso = detalles[1]?.nombre_procesos || '';
            }
        
            if (detalles[2]) {
              evidencia.registro = detalles[2]?.datos_registro || '';
            }
        
            if (detalles[3]) {
              evidencia.ambitoAcademico = detalles[3]?.nombre_ambito_academico || '';
            }
        
            if (detalles[4]) {
              evidencia.Ddac = detalles[4]?.revisado_dac ?? null;
            }
        
            if (detalles[5]) {
              evidencia.Dcomite = detalles[5]?.revisado_comite ?? null;
            }
        
            if (detalles[6]) {
              evidencia.Drevisor = detalles[6]?.revisado_revisor ?? null;
            }

            
    
            evidencia.icono = this.getIconName(evidencia.Drevisor || evidencia.Dcomite || evidencia.Ddac);
            if (this.searchTerm && evidencia.numero_folio) {
              const term = this.searchTerm.toLowerCase();
              const numeroFolio = evidencia.numero_folio.toString().toLowerCase();
    
              if (numeroFolio.includes(term)) {
                this.evidencias.push(evidencia);
              }
            }
          })
        );
      });
    
      forkJoin(observables).subscribe(() => {
        if (!this.searchTerm) {
          this.evidencias = evidencias;
        }
    
        if (!this.evidenciasOriginal) {
          this.evidenciasOriginal = [...this.evidencias];
        }
      });
    }

    private cargarEvidencias() {
      const idUsuario = localStorage.getItem('id_usuario');
    
      if (idUsuario) {
        this.evidenciasService.getEvidenciasByUsuario(+idUsuario).subscribe((evidencias) => {
          if (evidencias && evidencias.length > 0) {
            this.actualizarDetalles(evidencias);
          }
        });
      } else {
        console.error('ID de usuario no encontrado en el Local Storage.');
      }
    }
    
        
    filtrarEvidencias() {
      const idUsuario = localStorage.getItem('id_usuario');
    
      if (!this.selectedEstado && this.evidenciasOriginal) {
        this.evidencias = [...this.evidenciasOriginal];
        return;
      }
    
      if (this.selectedEstado && idUsuario) {
        this.evidencias = [];
    
        this.evidenciasService.filtrarEvidenciasPorAprobacion(this.selectedEstado, +idUsuario)
          .subscribe({
            next: (data) => {
              console.log(data);
              this.evidencias = data;
              this.actualizarDetalles(this.evidencias);
              setTimeout(() => {
                // Puedes intentar eliminar el siguiente bloque si el retraso no es necesario
                // this.cdr.detectChanges();
              }, 100);
            },
            error: (error) => {
              console.error('Error al filtrar evidencias:', error);
            }
          });
      } else {
        if (this.evidenciasOriginal) {
          this.evidencias = [...this.evidenciasOriginal];
        }
      }
    }

    determinarEstadoEvidencia(evidencia: Evidencia): string {
      const revisor = evidencia.Drevisor?.revisado_revisor;
      const dac = evidencia.Ddac?.revisado_dac;
      const comite = evidencia.Dcomite?.revisado_comite;
    
      if (revisor === true && dac === true && comite === true) {
        return 'Aprobada';
      } else if (revisor === false || dac === false || comite === false) {
        return 'Rechazada';
      } else {
        return 'En espera';
      }
    }
    

    getIconName(state: boolean | DetalleComite | DetalleRevisor | DetalleDAC | null ): string {
      if (state === true) {
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
  
  realizarBusqueda() {
    this.currentPage = 1;
  
    if (this.searchTerm) {
      this.evidencias = [];
      this.cargarEvidencias();
    } else {
      if (this.evidenciasOriginal) {
        this.evidencias = [...this.evidenciasOriginal];
      }
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

  pageChanged(page: number) {
    this.currentPage = page;
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
          this.cargarEvidencias();
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

  