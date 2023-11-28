import { Component, OnInit } from '@angular/core';
import { EvidenciasService } from '../../services/evidencias.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  mostrarFormularioAgregarUsuario: boolean = false;
  evidenciaEditId: number | null = null;
  form: FormGroup;
  currentPage: number = 1;
  searchTerm: string = '';
  private usuarioSubscription!: Subscription;


  constructor(
    private evidenciasService: EvidenciasService, 
    private toastr: ToastrService,
    private revisorService: revisorService,
    private dacService: DacService,
    private comiteService: ComiteService,
    private usuarioService: UsuarioService,
    private debilidadService: DebilidadService,
    private unidadService: UnidadService,
    private ambitoGeograficoService: AmbitoGeograficoService,
    private ambitoAcademicoService: AmbitoAService,
    private registroService: RegistroService,
    private carreraService: CarreraService,
    private facultadService: FacultadService,
    private procesoService: ProcesosService,
    private impactoService: ImpactoService,
    private estadoService: EstadoService,
    private fb: FormBuilder
    ) 
    {
      this.form = this.fb.group({
        numero_folio: ['', Validators.required],
        fecha_evidencia: ['', Validators.required],
        rut_usuario: ['', Validators.required],
        correo_usuario: ['', Validators.required],
        id_unidad: [null, Validators.required],
        id_proceso: [null, Validators.required],
        id_tipo_registro: [null, Validators.required],
        numero_de_mejoras: [null, Validators.required],
        id_ambito_academico: [null, Validators.required],
        id_ambito_geografico: [null, Validators.required],
        id_criterios: [null, Validators.required],
        id_debilidades: [null, Validators.required],
        descripcion: ['', Validators.required],
        resultado: ['', Validators.required],
        almacenamiento: ['', Validators.required],
        unidades_personas_evidencias: [null, Validators.required],
        palabra_clave: ['', Validators.required],
        nombre_corto_evidencia: ['', Validators.required],
        asistentes_interno_autoridades: [null],
        asistentes_interno_administrativos: [null],
        asistentes_interno_docentes: [null],
        asistentes_interno_estudiantes: [null],
        asistentes_externo_autoridades: [null],
        asistentes_externo_administrativos: [null],
        asistentes_externo_docentes: [null],
        asistentes_externo_estudiantes: [null],
        adjuntar_imagenes: [null],
        fecha_creacion: ['', Validators.required],
        fecha_actualizacion: ['', Validators.required],
        id_detalle_revisor: [null, Validators.required],
        id_detalle_dac: [null, Validators.required],
        id_detalle_comite: [null, Validators.required],
        id_usuario: [null, Validators.required],
        id_registro: [null, Validators.required],
        id_carrera: [null, Validators.required],
        id_facultad: [null, Validators.required],
        id_procesos: [null, Validators.required],
        id_impacto: [null, Validators.required],
        id_estado: [null, Validators.required],
      });
    }

  ngOnInit() {
    this.getEvidencia();
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
    this.evidenciasService.obtenerEvidencias().subscribe((evidencias) => {
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

  mostrarAgregarEditarUsuario(id: number | null) {
    if (id !== null) {
      this.evidenciaEditId = id;
      this.obtenerEvidencia(id);
    } 
    this.mostrarFormularioAgregarUsuario = true;
  }

  cancelarEdicionUsuario() {
    this.mostrarFormularioAgregarUsuario = false;
    this.evidenciaEditId = null;
    this.form.reset();
  }

  obtenerEvidencia(id: number) {
    this.evidenciasService.obtenerEvidenciaPorId(id).subscribe((evidencia) => {
      if (evidencia) {
        this.form.get('numero_folio')?.setValue(evidencia.numero_folio);
        this.form.get('fecha_evidencia')?.setValue(evidencia.fecha_evidencia);
        this.form.get('rut_usuario')?.setValue(evidencia.rut_usuario);
        this.form.get('correo_usuario')?.setValue(evidencia.correo_usuario);
        this.form.get('id_unidad')?.setValue(evidencia.id_unidad);
        this.form.get('id_proceso')?.setValue(evidencia.id_proceso);
        this.form.get('id_tipo_registro')?.setValue(evidencia.id_tipo_registro);
        this.form.get('numero_de_mejoras')?.setValue(evidencia.numero_de_mejoras);
        this.form.get('id_ambito_academico')?.setValue(evidencia.id_ambito_academico);
        this.form.get('id_ambito_geografico')?.setValue(evidencia.id_ambito_geografico);
        this.form.get('id_criterios')?.setValue(evidencia.id_criterios);
        this.form.get('id_debilidades')?.setValue(evidencia.id_debilidades);
        this.form.get('descripcion')?.setValue(evidencia.descripcion);
        this.form.get('resultado')?.setValue(evidencia.resultado);
        this.form.get('almacenamiento')?.setValue(evidencia.almacenamiento);
        this.form.get('unidades_personas_evidencias')?.setValue(evidencia.unidades_personas_evidencias);
        this.form.get('palabra_clave')?.setValue(evidencia.palabra_clave);
        this.form.get('nombre_corto_evidencia')?.setValue(evidencia.nombre_corto_evidencia);
        this.form.get('asistentes_interno_autoridades')?.setValue(evidencia.asistentes_interno_autoridades);
        this.form.get('asistentes_interno_administrativos')?.setValue(evidencia.asistentes_interno_administrativos);
        this.form.get('asistentes_interno_docentes')?.setValue(evidencia.asistentes_interno_docentes);
        this.form.get('asistentes_interno_estudiantes')?.setValue(evidencia.asistentes_interno_estudiantes);
        this.form.get('asistentes_externo_autoridades')?.setValue(evidencia.asistentes_externo_autoridades);
        this.form.get('asistentes_externo_administrativos')?.setValue(evidencia.asistentes_externo_administrativos);
        this.form.get('asistentes_externo_docentes')?.setValue(evidencia.asistentes_externo_docentes);
        this.form.get('asistentes_externo_estudiantes')?.setValue(evidencia.asistentes_externo_estudiantes);
        this.form.get('adjuntar_imagenes')?.setValue(evidencia.adjuntar_imagenes);
        this.form.get('fecha_creacion')?.setValue(evidencia.fecha_creacion);
        this.form.get('fecha_actualizacion')?.setValue(evidencia.fecha_actualizacion);
        this.form.get('id_detalle_revisor')?.setValue(evidencia.id_detalle_revisor);
        this.form.get('id_detalle_dac')?.setValue(evidencia.id_detalle_dac);
        this.form.get('id_detalle_comite')?.setValue(evidencia.id_detalle_comite);
        this.form.get('id_usuario')?.setValue(evidencia.id_usuario);
        this.form.get('id_registro')?.setValue(evidencia.id_registro);
        this.form.get('id_carrera')?.setValue(evidencia.id_carrera);
        this.form.get('id_facultad')?.setValue(evidencia.id_facultad);
        this.form.get('id_procesos')?.setValue(evidencia.id_procesos);
        this.form.get('id_impacto')?.setValue(evidencia.id_impacto);
        this.form.get('id_estado')?.setValue(evidencia.id_estado);
      }
    });
  }
}
  