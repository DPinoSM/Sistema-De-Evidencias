import { Component, OnInit } from '@angular/core';
import { EvidenciasService } from '../../services/evidencias.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { Evidencia } from '../../interfaces/evidencia.interface';
import { DetalleRevisor } from "../../interfaces/D_revisor.interface";
import { revisorService } from 'src/app/services/D-revisor.service';
import { DetalleDAC } from "../../interfaces/D_dac.interface";
import { DacService } from 'src/app/services/D-dac.service';
import { DetalleComite } from "../../interfaces/D_comite.interface";
import { ComiteService } from 'src/app/services/D-comite.service';
import { User } from "../../interfaces/usuario.interface";
import { UsuarioService } from 'src/app/services/usuario.service';
import { Debilidad } from "../../interfaces/debilidades.interface";
import { DebilidadService } from 'src/app/services/debilidad.service';
import { Unidad } from "../../interfaces/unidad.interface";
import { UnidadService } from 'src/app/services/unidad.service';
import { AmbitoGeografico } from "../../interfaces/ambito-geografico.interface";
import { AmbitoGeograficoService } from 'src/app/services/ambito-geografico.service';
import { AmbitoAcademico } from "../../interfaces/ambito-academico.interface";
import { AmbitoAService } from 'src/app/services/ambito-a.service';
import { Registro } from "../../interfaces/registro.interface";
import { RegistroService } from 'src/app/services/registro.service';
import { Carrera } from "../../interfaces/carrera.interface";
import { CarreraService } from 'src/app/services/carrera.service';
import { Facultad } from "../../interfaces/facultad.interface";
import { FacultadService } from 'src/app/services/facultad.service';
import { Proceso } from "../../interfaces/proceso.interface";
import { ProcesosService } from 'src/app/services/proceso.service';
import { Impacto } from "../../interfaces/impacto.interface";
import { ImpactoService } from 'src/app/services/impacto.service';
import { Estado } from "../../interfaces/estado.interface";
import { EstadoService } from 'src/app/services/estado.service';


@Component({
  selector: 'app-lista-evidencias',
  templateUrl: './lista-evidencias.component.html',
  styleUrls: ['./lista-evidencias.component.css', '../../../shared-styles.css']
})

export class ListaEvidenciasComponent implements OnInit {
  evidencias: Evidencia[] = [];
  evidenciasOriginal: Evidencia[] | null = null;
  ddac: DetalleDAC[] = [];
  dcomite: DetalleComite[] = [];
  drevisor: DetalleRevisor[] = [];
  usuarios: User[] = [];
  unidades: Unidad[] = [];
  debilidad: Debilidad[] = [];
  academico: AmbitoAcademico[] = [];
  geografico: AmbitoGeografico[] = [];
  registro: Registro[] = [];
  carrera: Carrera[] = [];
  facultad: Facultad[] = [];
  proceso: Proceso[] = [];
  impacto: Impacto[] = [];
  estado: Estado[] = [];
  errorMsg: string | undefined;
  sideNavStatus: boolean = false;
  form: FormGroup;
  currentPage: number = 1;
  searchTerm: string = '';
  private evidenciasSubscription!: Subscription;    
  imagenesAdjuntas: string[] = [];
  images: any[] = [];



  constructor(
    private evidenciasService: EvidenciasService, 
    private toastr: ToastrService,
    private revisorService: revisorService,
    private dacService: DacService,
    private comiteService: ComiteService,
    private router: Router,
    private usuarioService: UsuarioService,
    private debilidadService: DebilidadService,
    private unidadService: UnidadService,
    private ambitoGeograficoService: AmbitoGeograficoService,
    private ambitoAcademicoService: AmbitoAService,
    private registroService: RegistroService,
    private carreraService: CarreraService,
    private sharedService: SharedService,
    private facultadService: FacultadService,
    private procesoService: ProcesosService,
    private impactoService: ImpactoService,
    private estadoService: EstadoService
    ) 
    {
      this.form = new FormGroup({
        id_evidencias: new FormControl(null, [Validators.required]),
        numero_folio: new FormControl(null, [Validators.required]),
        id_usuario: new FormControl(null, [Validators.required]),
        fecha_evidencia: new FormControl('', [Validators.required]),
        numero_de_mejoras: new FormControl(null, [Validators.required]),
        descripcion: new FormControl('', [Validators.required]),
        resultado: new FormControl('', [Validators.required]),
        almacenamiento: new FormControl('', [Validators.required]),
        unidades_personas_evidencias: new FormControl(null, [Validators.required]), 
        palabra_clave: new FormControl('', [Validators.required]),
        nombre_corto_evidencia: new FormControl('', [Validators.required]),
        fecha_creacion: new FormControl('', [Validators.required]),
        fecha_actualizacion: new FormControl('', [Validators.required]),
        id_detalle_revisor: new FormControl(null, [Validators.required]),
        id_detalle_dac: new FormControl(null, [Validators.required]),
        id_detalle_comite: new FormControl(null, [Validators.required]),
        id_debilidades: new FormControl(null, [Validators.required]),
        id_unidad: new FormControl(null, [Validators.required]),
        id_ambito_geografico: new FormControl(null, [Validators.required]),
        id_ambito_academico: new FormControl(null, [Validators.required]),
        id_registro: new FormControl(null, [Validators.required]),
        id_carrera: new FormControl(null, [Validators.required]),
        id_facultad: new FormControl(null, [Validators.required]),
        id_procesos: new FormControl(null, [Validators.required]),
        id_impacto: new FormControl(null, [Validators.required]),
        id_estado: new FormControl(null, [Validators.required])
      });
    }

  ngOnInit() {
    this.getEvidencias();
    this.getUsers();
    this.getUnidades();
    this.getAmbitoA();
    this.getAmbitoG();
    this.getCarrera();
    this.getDcomite();
    this.getDdac();
    this.getDebilidades();
    this.getDrevisor();
    this.getEstado();
    this.getFacultad();
    this.getImpacto();
    this.getProceso();
    this.getRegistro();
  }

  getUnidades() {
    this.unidadService.getUnidades().subscribe((unidades) => {
      this.unidades = unidades;
    });
  }

  getUsers() {
    this.usuarioService.getUsers().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  getEvidencia() {
    this.evidenciasService.getEvidencias().subscribe((evidencias) => {
      this.evidencias = evidencias;
    });
  }

  getAmbitoA() {
    this.ambitoAcademicoService.getAmbitosAcademicos().subscribe((ambito_academico) => {
      this.academico = ambito_academico;
    });
  }

  getAmbitoG() {
    this.ambitoGeograficoService.getAmbitosGeograficos().subscribe((ambito_geografico) => {
      this.geografico = ambito_geografico;
    });
  }

  getCarrera() {
    this.carreraService.obtenerCarreras().subscribe((carrera) => {
      this.carrera = carrera;
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

  getDebilidades() {
    this.debilidadService.obtenerDebilidad().subscribe((debilidades) => {
      this.debilidad = debilidades;
    });
  }

  getRegistro() {
    this.registroService.getRegistros().subscribe((registro) => {
      this.registro = registro;
    });
  }

  getFacultad() {
    this.facultadService.getFacultades().subscribe((facultad) => {
      this.facultad = facultad;
    });
  }

  getProceso() {
    this.procesoService.getProcesos().subscribe((procesos) => {
      this.proceso = procesos;
    });
  }

  getDrevisor() {
    this.revisorService.obtenerRevisor().subscribe((revisor) => {
      this.drevisor = revisor;
    });
  }

  getImpacto() {
    this.impactoService.obtenerImpacto().subscribe((impacto) => {
      this.impacto = impacto;
    });
  }

  getEstado() {
    this.estadoService.obtenerEstado().subscribe((estado) => {
      this.estado = estado;
    });
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
  
  
  
  

  obtenerEvidencia(id: number ) {
    this.evidenciasService.getEvidencia(id).subscribe((evidencias) => {
      if (evidencias) {
        this.form.get('id_evidencias')?.setValue( evidencias.id_evidencias);
        this.form.get('numero_folio')?.setValue( evidencias.numero_folio);
        this.form.get('id_usuario')?.setValue( evidencias.id_usuario);
        this.form.get('fecha_evidencia')?.setValue(evidencias.fecha_evidencia);
        this.form.get('numero_de_mejoras')?.setValue( evidencias.numero_de_mejoras);
        this.form.get('descripcion')?.setValue( evidencias.descripcion);
        this.form.get('resultado')?.setValue( evidencias.resultado);
        this.form.get('almecenamiento')?.setValue( evidencias.almecenamiento);
        this.form.get('unidades_personas_evidencias')?.setValue( evidencias.unidades_personas_evidencias);
        this.form.get('palabra_clave')?.setValue( evidencias.palabra_clave);
        this.form.get('nombre_corto_evidencia')?.setValue( evidencias.nombre_corto_evidencia);
        this.form.get('fecha_creacion')?.setValue( evidencias.fecha_creacion);
        this.form.get('fecha_actualizacion')?.setValue( evidencias.fecha_actualizacion);
        this.form.get('id_detalle_revisor')?.setValue( evidencias.id_detalle_revisor);
        this.form.get('id_detalle_dac')?.setValue( evidencias.id_detalle_dac);
        this.form.get('id_detalle_comite')?.setValue( evidencias.id_detalle_comite);
        this.form.get('id_debilidades')?.setValue( evidencias.id_debilidades);
        this.form.get('id_unidad')?.setValue(evidencias.id_unidad);
        this.form.get('id_ambito_geografico')?.setValue(evidencias.id_ambito_geografico);
        this.form.get('id_ambito_academico')?.setValue(evidencias.id_ambito_academico);
        this.form.get('id_registro')?.setValue(evidencias.id_registro);
        this.form.get('id_carrera')?.setValue(evidencias.id_carrera);
        this.form.get('id_facultad')?.setValue(evidencias.id_facultad);
        this.form.get('id_procesos')?.setValue(evidencias.id_procesos);
        this.form.get('id_procesos')?.setValue(evidencias.id_procesos);
        this.form.get('id_impacto')?.setValue(evidencias.id_impacto);
        this.form.get('id_estado')?.setValue(evidencias.id_estado);
 
   
      }
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

  realizarBusqueda() {
    if (this.searchTerm) {
      this.currentPage = 1;
      this.getEvidencias(); 
    } else {

      if (this.evidenciasOriginal) {
        this.evidencias = this.evidenciasOriginal;
      }
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



}


  