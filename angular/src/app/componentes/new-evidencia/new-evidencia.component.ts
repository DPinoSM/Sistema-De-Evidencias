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
  criterios: Criterio[] = [];
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
    private fb: FormBuilder
    ) 
    {
      this.form = this.fb.group({
        numero_folio: ['', Validators.required],
        fecha_evidencia: [null, Validators.required], // Usa null para fechas por defecto
        rut_usuario: [null, Validators.required],
        correo_usuario: [null, Validators.required],
        id_usuario: [null, Validators.required],
        id_unidad: [null, Validators.required],
        id_procesos: [null, Validators.required],
        id_registro: [null, Validators.required],
        numero_de_mejoras: [null, Validators.required],
        id_ambito_academico: [null, Validators.required],
        id_ambito_geografico: [null, Validators.required],
        id_criterios: [null, Validators.required],
        id_debilidades: [null, Validators.required],
        id_carrera: [null, Validators.required],
        id_facultad: [null, Validators.required],
        id_impacto: [null, Validators.required],
        id_estado: [null, Validators.required],
        descripcion: ['', Validators.required],
        resultado: ['', Validators.required],
        almacenamiento: ['', Validators.required],
        unidades_personas_evidencias: [null, Validators.required],
        palabra_clave: ['', Validators.required],
        nombre_corto_evidencia: ['', Validators.required],
        asistentes_interno_autoridades: [null, Validators.required],
        asistentes_interno_administrativos: [null, Validators.required],
        asistentes_interno_docentes: [null, Validators.required],
        asistentes_interno_estudiantes: [null, Validators.required],
        asistentes_externo_autoridades: [null, Validators.required],
        asistentes_externo_administrativos: [null, Validators.required],
        asistentes_externo_docentes: [null, Validators.required],
        asistentes_externo_estudiantes: [null, Validators.required],
        adjuntar_imagenes: [null, Validators.required],
        fecha_creacion: [{ value: new Date(), disabled: true }, Validators.required],
      });
      
    }
    
    

  ngOnInit() {
    this.getUsers();
    this.getUnidades();
    this.getAmbitoA();
    this.getAmbitoG();
    this.getCarrera();
    this.getDcomite();
    this.getDdac();
    this.getCriterio();
    this.getDebilidades();
    this.getDrevisor();
    this.getEstado();
    this.getFacultad();
    this.getImpacto();
    this.getProceso();
    this.getRegistro();
    const usuarioLogeadoInfo = this.authService.getUsuarioLogeadoInfo();

    if (usuarioLogeadoInfo) {
      this.form.patchValue({
        rut_usuario: usuarioLogeadoInfo.rut,
        correo_usuario: usuarioLogeadoInfo.correo,
      });
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
    this.criterioService.getCriterios().subscribe((criterio) => {
      this.criterios = criterio;
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

  // Método para crear una nueva evidencia
  crearEvidencia() {
    if (this.form.valid) {
      const nuevaEvidencia: Evidencia = this.form.value;
  
      // Convertir FileList a Uint8Array
      const files: FileList | null = this.form.get('adjuntar_imagenes')?.value;
      if (files) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as ArrayBuffer;
          const uintArray = new Uint8Array(result);
          nuevaEvidencia.adjuntar_imagenes = uintArray;
  
          // Ahora puedes enviar la evidencia al servicio
          this.evidenciasService.nuevaEvidencia(nuevaEvidencia).subscribe({
            next: (response) => {
              console.log('Evidencia creada con éxito', response);
              this.form.reset();
            },
            error: (error) => {
              console.error('Error al crear la evidencia', error);
            }
          });
        };
  
        reader.readAsArrayBuffer(files[0]);
      }
    } else {
      console.error('Formulario no válido. Verifica los campos.');
    }
  }
  
  
  

}


  