import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { EvidenciasService } from '../../services/evidencias.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-new-evidencia',
  templateUrl: './new-evidencia.component.html',
  styleUrls: ['./new-evidencia.component.css', '../../../shared-styles.css'],
  providers: [DatePipe],
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
  dateTimeInterval: any;
  currentDateTime: string = '';


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
    private estadoService: EstadoService,
    private authService: AuthService,
    @Inject('CHUNK_SIZE') private CHUNK_SIZE: number
  ) {
      this.form = new FormGroup({
        numero_folio: new FormControl('', Validators.required),
        fecha_evidencia: new FormControl(null, Validators.required),
        rut_usuario: new FormControl({value: '', disabled: true}),
        correo_usuario: new FormControl({value: '', disabled: true}),
        id_usuario: new FormControl(null, Validators.required),
        id_unidad: new FormControl(null, Validators.required),
        id_procesos: new FormControl(null, Validators.required),
        id_registro: new FormControl(null, Validators.required),
        numero_de_mejoras: new FormControl(null, Validators.required),
        id_ambito_academico: new FormControl(null, Validators.required),
        id_ambito_geografico: new FormControl(null, Validators.required),
        id_criterios: new FormControl(null, Validators.required),
        id_debilidades: new FormControl(null, Validators.required),
        id_carrera: new FormControl(null, Validators.required),
        id_facultad: new FormControl(null, Validators.required),
        id_impacto: new FormControl(null, Validators.required),
        id_estado: new FormControl(null, Validators.required),
        descripcion: new FormControl('', Validators.required),
        resultado: new FormControl('', Validators.required),
        almacenamiento: new FormControl('', Validators.required),
        unidades_personas_evidencias: new FormControl('', Validators.required),
        palabra_clave: new FormControl('', Validators.required),
        nombre_corto_evidencia: new FormControl('', Validators.required),
        asistentes_internos_autoridades: new FormControl(null, Validators.required),
        asistentes_internos_administrativos: new FormControl(null, Validators.required),
        asistentes_internos_docentes: new FormControl(null, Validators.required),
        asistentes_internos_estudiantes: new FormControl(null, Validators.required),
        asistentes_externos_autoridades: new FormControl(null, Validators.required),
        asistentes_externos_administrativos: new FormControl(null, Validators.required),
        asistentes_externos_docentes: new FormControl(null, Validators.required),
        asistentes_externos_estudiantes: new FormControl(null, Validators.required),
        archivo_adjunto: new FormControl(null),
        fecha_creacion: new FormControl({ value: this.getCurrentDateTime(), disabled: true }),
      });
      this.updateCurrentDateTime();
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

    this.dateTimeInterval = setInterval(() => {
      this.updateCurrentDateTime();
    }, 10);
  }
  
  ngOnDestroy() {
    clearInterval(this.dateTimeInterval);
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

  updateCurrentDateTime() {
    this.currentDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss') || '';
  }

  getCurrentDateTime(): string {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss') || '';
  }

  onFileSelected(event: any) {
    const files: FileList | null = event.target.files;
  
    if (files && files.length > 0) {
      this.handleFiles(files);
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }
  
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  
  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFiles(files);
    }
  }
  
  onDragStart(event: DragEvent, index: number) {
    event.dataTransfer?.setData('text/plain', index.toString());
  }
  
  private handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        this.imagenesAdjuntas.push(result);
      };
      reader.readAsDataURL(files[i]);
    }

    this.form.get('archivo_adjunto')?.setValue(files);
  }
  

  eliminarImagen(index: number) {
    this.imagenesAdjuntas.splice(index, 1);
  }
  


  // Método para crear una nueva evidencia
  crearEvidencia() {
    console.log('Estado del formulario antes de la validación:', this.form.value);
  
    if (this.form.valid) {
      const numero_folio = this.form.get('numero_folio')?.value;
      const fecha_evidencia = this.form.get('fecha_evidencia')?.value;
      const rut_usuario = this.form.get('rut_usuario')?.value;
      const correo_usuario = this.form.get('correo_usuario')?.value;
      const id_usuario = this.form.get('id_usuario')?.value;
      const id_unidad = this.form.get('id_unidad')?.value;
      const id_procesos = this.form.get('id_procesos')?.value;
      const id_registro = this.form.get('id_registro')?.value;
      const numero_de_mejoras = this.form.get('numero_de_mejoras')?.value;
      const id_ambito_academico = this.form.get('id_ambito_academico')?.value;
      const id_ambito_geografico = this.form.get('id_ambito_geografico')?.value;
      const id_criterios = this.form.get('id_criterios')?.value;
      const id_debilidades = this.form.get('id_debilidades')?.value;
      const id_carrera = this.form.get('id_carrera')?.value;
      const id_facultad = this.form.get('id_facultad')?.value;
      const id_impacto = this.form.get('id_impacto')?.value;
      const id_estado = this.form.get('id_estado')?.value;
      const descripcion = this.form.get('descripcion')?.value;
      const resultado = this.form.get('resultado')?.value;
      const almacenamiento = this.form.get('almacenamiento')?.value;
      const unidades_personas_evidencias = this.form.get('unidades_personas_evidencias')?.value;
      const palabra_clave = this.form.get('palabra_clave')?.value;
      const nombre_corto_evidencia = this.form.get('nombre_corto_evidencia')?.value;
      const asistentes_internos_autoridades = this.form.get('asistentes_internos_autoridades')?.value;
      const asistentes_internos_administrativos = this.form.get('asistentes_internos_administrativos')?.value;
      const asistentes_internos_docentes = this.form.get('asistentes_internos_docentes')?.value;
      const asistentes_internos_estudiantes = this.form.get('asistentes_internos_estudiantes')?.value;
      const asistentes_externos_autoridades = this.form.get('asistentes_externos_autoridades')?.value;
      const asistentes_externos_administrativos = this.form.get('asistentes_externos_administrativos')?.value;
      const asistentes_externos_docentes = this.form.get('asistentes_externos_docentes')?.value;
      const asistentes_externos_estudiantes = this.form.get('asistentes_externos_estudiantes')?.value;
      const files: FileList | null = this.form.get('archivo_adjunto')?.value;
      const fecha_creacion = this.getCurrentDateTime();
      this.form.get('fecha_creacion')?.setValue(fecha_creacion);

      if (files && files.length > 0) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as ArrayBuffer;
          const uintArray = new Uint8Array(result);
      
          this.evidenciasService.newEvidencia({
              numero_folio: numero_folio,
              fecha_evidencia: fecha_evidencia,
              rut_usuario: rut_usuario,
              correo_usuario: correo_usuario,
              id_usuario: id_usuario,
              id_unidad: id_unidad,
              id_procesos: id_procesos,
              id_registro: id_registro,
              numero_de_mejoras: numero_de_mejoras,
              id_ambito_academico: id_ambito_academico,
              id_ambito_geografico: id_ambito_geografico,
              id_criterios: id_criterios,
              id_debilidades: id_debilidades,
              id_carrera: id_carrera,
              id_facultad: id_facultad,
              id_impacto: id_impacto,
              id_estado: id_estado,
              descripcion: descripcion,
              resultado: resultado,
              almacenamiento: almacenamiento,
              unidades_personas_evidencias: unidades_personas_evidencias,
              palabra_clave: palabra_clave,
              nombre_corto_evidencia: nombre_corto_evidencia,
              asistentes_internos_autoridades: asistentes_internos_autoridades,
              asistentes_internos_administrativos: asistentes_internos_administrativos,
              asistentes_internos_docentes: asistentes_internos_docentes,
              asistentes_internos_estudiantes: asistentes_internos_estudiantes,
              asistentes_externos_autoridades: asistentes_externos_autoridades,
              asistentes_externos_administrativos: asistentes_externos_administrativos,
              asistentes_externos_docentes: asistentes_externos_docentes,
              asistentes_externos_estudiantes: asistentes_externos_estudiantes,
              archivo_adjunto: uintArray,
              fecha_creacion: this.getCurrentDateTime(),
            }).subscribe({
              next: (response) => {
                console.log('Evidencia creada con éxito', response);
                this.toastr.success('Evidencia creada con éxito', 'Éxito');
                this.form.reset();
                this.imagenesAdjuntas = [];
                //this.router.navigate(['/evidencias']);
              },
              error: (error) => {
                console.error('Error al crear la evidencia', error);
                this.toastr.error('Error al crear la evidencia', 'Error');
              }
            });
          };
    
          reader.readAsArrayBuffer(files[0]);
          } else {
            console.error('No se ha seleccionado ningún archivo.');
            this.toastr.error('No se ha seleccionado ningún archivo.', 'Error');
          }
      } else {
        console.error('Formulario no válido. Verifica los campos.');
        this.toastr.error('Formulario no válido. Verifica los campos.', 'Error');
      }
    }
  
  
  

  cancelar() {
    this.router.navigate(['/evidencias']);
  }
  
  
  
  

}


  