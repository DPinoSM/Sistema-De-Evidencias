import { Component, OnInit } from '@angular/core';
import { EvidenciasService } from '../../services/evidencias.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Evidencia } from 'src/app/interfaces/evidencia.interface';
import { saveAs } from 'file-saver';
import { Unidad } from 'src/app/interfaces/unidad.interface';
import { UnidadService } from 'src/app/services/unidad.service';
import { Proceso } from 'src/app/interfaces/proceso.interface';
import { ProcesosService } from 'src/app/services/proceso.service';
import { Registro } from 'src/app/interfaces/registro.interface';
import { RegistroService } from 'src/app/services/registro.service';
import { Debilidad } from 'src/app/interfaces/debilidades.interface';
import { DebilidadService } from 'src/app/services/debilidad.service';
import { Criterio } from 'src/app/interfaces/criterio.interface';
import { CriterioService } from 'src/app/services/criterio.service';

@Component({
  selector: 'app-dac',
  templateUrl: './dac.component.html',
  styleUrls: ['./dac.component.css', '../../../shared-styles.css']
})
export class DacComponent implements OnInit {
  sideNavStatus: boolean = false;
  evidencias: Evidencia[] = [];
  unidad: Unidad[] = [];
  proceso: Proceso[] = [];
  registro: Registro[] = [];
  debilidades: Debilidad[] = [];
  criterios: Criterio[] = [];
  errorMsg: string | undefined;
  private evidenciasSubscription!: Subscription;
  currentPage: number = 1;
  searchTerm: string = '';
  evidenciasOriginal: Evidencia[] | null = null;  

  constructor(
    private evidenciasService: EvidenciasService,
    private unidadService: UnidadService,
    private procesoService: ProcesosService,
    private registroService: RegistroService,
    private debilidadService: DebilidadService,
    private criterioService: CriterioService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getEvidencias();
    this.getCriterio();
    this.getDebilidades();
    this.getProceso();
    this.getRegistro();
    this.getUnidades();
  }

  getUnidades() {
    this.unidadService.getUnidades().subscribe((unidades) => {
      this.unidad = unidades;
    });
  }

  getDebilidades() {
    this.debilidadService.obtenerDebilidad().subscribe((debilidades) => {
      this.debilidades = debilidades;
    });
  }

  getRegistro() {
    this.registroService.getRegistros().subscribe((registro) => {
      this.registro = registro;
    });
  }

  getProceso() {
    this.procesoService.getProcesos().subscribe((procesos) => {
      this.proceso = procesos;
    });
  }

  getCriterio() {
    this.criterioService.getCriterios().subscribe((criterio) => {
      this.criterios = criterio;
    });
  }

  getEvidencias() {
    if (this.evidenciasSubscription) {
      this.evidenciasSubscription.unsubscribe();
    }
  
    this.evidenciasSubscription = this.evidenciasService.getEvidencias()
      .subscribe({
        next: (data: Evidencia[]) => {
          this.evidencias = data;
        },
        error: (error) => {
          this.errorMsg = 'Error al obtener la lista de evidencias';
          console.error('Error al obtener la lista de evidencias', error);
        }
      });
  }
  
  //aprobarEvidencia(idEvidencia: number, comentario: string): void {
    //this.aprobarRechazarEvidencia(idEvidencia, true, comentario);
 // }

 // rechazarEvidencia(idEvidencia: number, comentario: string): void {
  //  this.aprobarRechazarEvidencia(idEvidencia, false, comentario);
 // }

  //private aprobarRechazarEvidencia(idEvidencia: number, aprobado: boolean, comentario: string): void {
   // this.evidenciasService.aprobarRechazarEvidencia(idEvidencia, aprobado, comentario)
     // .subscribe(
       // () => {
        //  this.toastr.success(`La evidencia fue ${aprobado ? 'aprobada' : 'rechazada'} con éxito`, 'Operación Exitosa');
        //  this.getEvidencias();  
       // },
       // error => {
       //   console.error(`Error al ${aprobado ? 'aprobar' : 'rechazar'} la evidencia`, error);
        //  this.toastr.error('Error al procesar la operación', 'Error');
      //  }
     // );
 // }

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
    if (this.searchTerm) {
      this.currentPage = 1;
      this.getEvidencias (); 
    } else {

      if (this.evidenciasOriginal) {
        this.evidencias = this.evidenciasOriginal;
      }
    }
  }

  pageChanged(page: number) {
    this.currentPage = page;
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