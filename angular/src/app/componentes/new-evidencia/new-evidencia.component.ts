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
import { AuthService } from 'src/app/services/auth.service';
import { Criterio } from 'src/app/interfaces/criterio.interface';
import { CriterioService } from 'src/app/services/criterio.service';


@Component({
  selector: 'app-new-evidencia',
  templateUrl: './new-evidencia.component.html',
  styleUrls: ['./new-evidencia.component.css', '../../../shared-styles.css']
})

export class NewEvidenciaComponent implements OnInit {
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
  criterio: Criterio[] = [];
  impacto: Impacto[] = [];
  estado: Estado[] = [];
  errorMsg: string | undefined;
  sideNavStatus: boolean = false;
  
  imagenesAdjuntas: string[] = [];
  images: any[] = [];
  rut_usuario: number | null = null;
  correo_usuario: string | null = null;

  form: FormGroup;
  private evidenciaSubscription!: Subscription;


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
    private criterioService: CriterioService,
    private carreraService: CarreraService,
    private facultadService: FacultadService,
    private procesoService: ProcesosService,
    private impactoService: ImpactoService,
    private estadoService: EstadoService,
    private authService: AuthService,
    private fb: FormBuilder) {
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
        id_criterio: [null, Validators.required],
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
    const usuarioLogeadoInfo = this.authService.getUsuarioLogeadoInfo();

    if (usuarioLogeadoInfo) {
      this.rut_usuario = usuarioLogeadoInfo.rut;
      this.correo_usuario = usuarioLogeadoInfo.correo;
      console.log(this.rut_usuario, this.correo_usuario);
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

  getCriterio() {
    this.criterioService.getCriterios().subscribe((criterios) => {
      this.criterio = criterios;
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

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagenesAdjuntas.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  eliminarImagen(index: number) {
    this.imagenesAdjuntas.splice(index, 1);
  }

  // Método llamado cuando se suelta una imagen en la zona de arrastrar y soltar
  onDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.handleFiles(files);
  }

  // Método llamado cuando se arrastra una imagen sobre la zona de arrastrar y soltar
  onDragOver(event: any) {
    event.preventDefault();
  }

  // Método para manejar los archivos seleccionados o arrastrados
  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.images.push({ url: e.target.result, file: files[i] });
      };

      reader.readAsDataURL(files[i]);
    }
  }

  // Método para eliminar una imagen
  removeImage(image: any) {
    const index = this.images.indexOf(image);
    if (index !== -1) {
      this.images.splice(index, 1);
    }
  }
}


  