import { Component, OnInit} from '@angular/core';
import { EvidenciasService } from '../../services/evidencias.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { DatePipe } from '@angular/common';
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
import { AuthService } from 'src/app/services/auth.service';
import { Criterio } from 'src/app/interfaces/criterio.interface';
import { CriterioService } from 'src/app/services/criterio.service';

@Component({
  selector: 'app-arevidencia',
  templateUrl: './arevidencia.component.html',
  styleUrls: ['./arevidencia.component.css']
})
export class ARevidenciaComponent implements OnInit{
  evidencias: Evidencia[] = [];
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
  criterios: Criterio[] = [];
  impacto: Impacto[] = [];
  estado: Estado[] = [];
  errorMsg: string | undefined;
  sideNavStatus: boolean = false;
  idEvidencia: number | null = null;
  form: FormGroup;
  isFormDisabled: boolean = false;


  constructor(
    private evidenciasService: EvidenciasService, 
    private toastr: ToastrService,
    private revisorService: revisorService,
    private dacService: DacService,
    private router: Router,
    private comiteService: ComiteService,
    private usuarioService: UsuarioService,
    private debilidadService: DebilidadService,
    private unidadService: UnidadService,
    private ambitoGeograficoService: AmbitoGeograficoService,
    private ambitoAcademicoService: AmbitoAService,
    private registroService: RegistroService,
    private criterioService: CriterioService,
    private carreraService: CarreraService,
    private facultadService: FacultadService,
    private procesoService: ProcesosService,
    private impactoService: ImpactoService,
    private datePipe: DatePipe,
    private sharedService: SharedService,
    private estadoService: EstadoService
  ) {
      this.form = new FormGroup({
          id_evidencia: new FormControl({ value: null, disabled: true }),
          numero_folio: new FormControl({ value: '', disabled: true }),
          fecha_evidencia: new FormControl({ value: null, disabled: true }),
          rut_usuario: new FormControl({ value: '', disabled: true }),
          correo_usuario: new FormControl({ value: '', disabled: true }),
          id_usuario: new FormControl({ value: null, disabled: true }),
          id_unidad: new FormControl({ value: null, disabled: true }),
          id_procesos: new FormControl({ value: null, disabled: true }),
          id_registro: new FormControl({ value: null, disabled: true }),
          numero_de_mejoras: new FormControl({ value: null, disabled: true }),
          id_ambito_academico: new FormControl({ value: null, disabled: true }),
          id_ambito_geografico: new FormControl({ value: null, disabled: true }),
          id_criterios: new FormControl({ value: null, disabled: true }),
          id_debilidades: new FormControl({ value: null, disabled: true }),
          id_carrera: new FormControl({ value: null, disabled: true }),
          id_facultad: new FormControl({ value: null, disabled: true }),
          id_impacto: new FormControl({ value: null, disabled: true }),
          id_estado: new FormControl({ value: null, disabled: true }),
          descripcion: new FormControl({ value: '', disabled: true }),
          resultado: new FormControl({ value: '', disabled: true }),
          almacenamiento: new FormControl({ value: '', disabled: true }),
          unidades_personas_evidencias: new FormControl({ value: '', disabled: true }),
          palabra_clave: new FormControl({ value: '', disabled: true }),
          nombre_corto_evidencia: new FormControl({ value: '', disabled: true }),
          asistentes_internos_autoridades: new FormControl({ value: null, disabled: true }),
          asistentes_internos_administrativos: new FormControl({ value: null, disabled: true }),
          asistentes_internos_docentes: new FormControl({ value: null, disabled: true }),
          asistentes_internos_estudiantes: new FormControl({ value: null, disabled: true }),
          asistentes_externos_autoridades: new FormControl({ value: null, disabled: true }),
          asistentes_externos_administrativos: new FormControl({ value: null, disabled: true }),
          asistentes_externos_docentes: new FormControl({ value: null, disabled: true }),
          asistentes_externos_estudiantes: new FormControl({ value: null, disabled: true }),
          fecha_creacion: new FormControl({ value: '', disabled: true }),
          id_detalle_revisor: new FormControl(null),
          id_detalle_comite: new FormControl(null),
          id_detalle_dac: new FormControl(null)
        });
    }
    
    

    ngOnInit() {
      this.sharedService.evidenciaId$.subscribe((id) => {
        this.form.get('id_evidencia')?.setValue(id);
        this.obtenerEvidencia(id);
      });
    this.getUsers();
    this.getUnidades();
    this.getAmbitoA();
    this.getAmbitoG();
    this.getCarrera();
    this.getCriterio();
    this.getDebilidades();
    this.getEstado();
    this.getFacultad();
    this.getImpacto();
    this.getProceso();
    this.getRegistro();
  }

  obtenerEvidencia(id: number | null) {
    if (id !== null) {
      this.evidenciasService.getEvidencia(id).subscribe((evidencias) => {
        if (evidencias) {
        this.form.patchValue({
          id_evidencias: evidencias.id_evidencias,
          numero_folio: evidencias.numero_folio,
          id_usuario: evidencias.id_usuario,
          fecha_evidencia: evidencias.fecha_evidencia,
          rut_usuario: evidencias.rut_usuario,
          correo_usuario: evidencias.correo_usuario,
          id_unidad: evidencias.id_unidad,
          id_procesos: evidencias.id_procesos,
          id_registro: evidencias.id_registro,
          numero_de_mejoras: evidencias.numero_de_mejoras,
          id_ambito_academico: evidencias.id_ambito_academico,
          id_ambito_geografico: evidencias.id_ambito_geografico,
          id_criterios: evidencias.id_criterios,
          id_debilidades: evidencias.id_debilidades,
          id_carrera: evidencias.id_carrera,
          id_facultad: evidencias.id_facultad,
          id_impacto: evidencias.id_impacto,
          id_estado: evidencias.id_estado,
          descripcion: evidencias.descripcion,
          resultado: evidencias.resultado,
          almacenamiento: evidencias.almacenamiento,
          unidades_personas_evidencias: evidencias.unidades_personas_evidencias,
          palabra_clave: evidencias.palabra_clave,
          nombre_corto_evidencia: evidencias.nombre_corto_evidencia,
          asistentes_internos_autoridades: evidencias.asistentes_internos_autoridades,
          asistentes_internos_administrativos: evidencias.asistentes_internos_administrativos,
          asistentes_internos_docentes: evidencias.asistentes_internos_docentes,
          asistentes_internos_estudiantes: evidencias.asistentes_internos_estudiantes,
          asistentes_externos_autoridades: evidencias.asistentes_externos_autoridades,
          asistentes_externos_administrativos: evidencias.asistentes_externos_administrativos,
          asistentes_externos_docentes: evidencias.asistentes_externos_docentes,
          asistentes_externos_estudiantes: evidencias.asistentes_externos_estudiantes,
          fecha_creacion: evidencias.fecha_creacion,      
        });
      }
    })
  } else {

    console.error('ID is null');
  }
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

  getCriterio() {
    this.criterioService.getCriterios().subscribe((criterio) => {
      this.criterios = criterio;
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

    actualizarEvidencia(id_evidencia: number | null) {
      if (id_evidencia !== null) {
          const id_detalle_revisor = this.form.get('id_detalle_revisor')?.value;
          const id_detalle_comite = this.form.get('id_detalle_comite')?.value;
          const id_detalle_dac = this.form.get('id_detalle_dac')?.value;
          
          this.evidenciasService.updateEvidencia(id_evidencia, {
                id_detalle_revisor: id_detalle_revisor,
                id_detalle_comite: id_detalle_comite,
                id_detalle_dac: id_detalle_dac
          }).subscribe({
            next: (response) => {
              this.toastr.success('Evidencia aprobada con éxito', 'Éxito');
              this.form.reset();
            },
            error: (error) => {
              this.toastr.error('Error al aprobar la evidencia', 'Error');
            }
          });
        };
    }

    cancelar() {
      this.router.navigate(['/comite']);
    }

}

