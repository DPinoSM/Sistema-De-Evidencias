
import { Component, OnInit } from '@angular/core';
import { EvidenciasService } from '../../services/evidencias.service';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Evidencia } from 'src/app/interfaces/evidencia.interface';
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
  selector: 'app-evidencias-admin',
  templateUrl: './evidencias-admin.component.html',
  styleUrls: ['./evidencias-admin.component.css', '../../../shared-styles.css']
})
export class EvidenciasAdminComponent implements OnInit {
  evidencias: Evidencia[] = [];
  unidades: Unidad[] = [];
  academico: AmbitoAcademico[] = [];
  registro: Registro[] = [];
  proceso: Proceso[] = [];
  ddac: DetalleDAC[] = [];
  dcomite: DetalleComite[] = [];
  drevisor: DetalleRevisor[] = [];
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
    private unidadService: UnidadService,
    private ambitoAcademicoService: AmbitoAService,
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
      this.getEvidencias();
      this.getUnidades();
      this.getAmbitoA();
      this.getProceso();
      this.getRegistro();  
      this.getDcomite();
      this.getDdac();
      this.getDrevisor();
    }

    getUnidades() {
      this.unidadService.getUnidades().subscribe((unidades) => {
        this.unidades = unidades;
      });
    }

    getAmbitoA() {
      this.ambitoAcademicoService.getAmbitosAcademicos().subscribe((ambito_academico) => {
        this.academico = ambito_academico;
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

    getDcomite() {
      this.comiteService.obtenerComite().subscribe((comite) => {
        this.dcomite = comite;
      });
    }
  
    getDdac() {
      this.dacService.obtenerDac().subscribe((dac) => {
        this.ddac = dac;
      });
    }

    getDrevisor() {
      this.revisorService.obtenerRevisor().subscribe((revisor) => {
        this.drevisor = revisor;
      });
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

  