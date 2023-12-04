import { Component, OnInit } from '@angular/core';
import { EvidenciasService } from '../../services/evidencias.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  private usuarioSubscription!: Subscription;
  currentPage: number = 1;
  searchTerm: string = '';
  evidenciaId: number | null = null;
  private evidenciasSubscription!: Subscription;
  mostrarFormularioAgregarEvidencia: boolean = false;


    
  imagenesAdjuntas: string[] = [];
  images: any[] = [];
  rut_usuario: number | null = null;
  correo_usuario: string | null = null;

  dateTimeInterval: any;
  currentDateTime: string = '';


  constructor(
    private evidenciasService: EvidenciasService, 
    private toastr: ToastrService,
    private revisorService: revisorService,
    private dacService: DacService,
    private comiteService: ComiteService,
    private datePipe: DatePipe,
    private router: Router,
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

  obtenerEvidencia(id: number) { //OBTENER USUARIO
    this.evidenciasService.getEvidencia(id).subscribe((evidencia) => {
      if (evidencia) {
        this.form.get('id_evidencias')?.setValue( evidencia.id_evidencias);
        this.form.get('numero_folio')?.setValue( evidencia.numero_folio);
        this.form.get('id_usuario')?.setValue( evidencia.id_usuario);
        this.form.get('fecha_evidencia')?.setValue(evidencia.fecha_evidencia);
        this.form.get('numero_de_mejoras')?.setValue( evidencia.numero_de_mejoras);
        this.form.get('descripcion')?.setValue( evidencia.descripcion);
        this.form.get('resultado')?.setValue( evidencia.resultado);
        this.form.get('almecenamiento')?.setValue( evidencia.almecenamiento);
        this.form.get('unidades_personas_evidencias')?.setValue( evidencia.unidades_personas_evidencias);
        this.form.get('palabra_clave')?.setValue( evidencia.palabra_clave);
        this.form.get('nombre_corto_evidencia')?.setValue( evidencia.nombre_corto_evidencia);
        this.form.get('fecha_creacion')?.setValue( evidencia.fecha_creacion);
        this.form.get('fecha_actualizacion')?.setValue( evidencia.fecha_actualizacion);
        this.form.get('id_detalle_revisor')?.setValue( evidencia.id_detalle_revisor);
        this.form.get('id_detalle_dac')?.setValue( evidencia.id_detalle_dac);
        this.form.get('id_detalle_comite')?.setValue( evidencia.id_detalle_comite);
        this.form.get('id_debilidades')?.setValue( evidencia.id_debilidades);
        this.form.get('id_unidad')?.setValue(evidencia.id_unidad);
        this.form.get('id_ambito_geografico')?.setValue(evidencia.id_ambito_geografico);
        this.form.get('id_ambito_academico')?.setValue(evidencia.id_ambito_academico);
        this.form.get('id_registro')?.setValue(evidencia.id_registro);
        this.form.get('id_carrera')?.setValue(evidencia.id_carrera);
        this.form.get('id_facultad')?.setValue(evidencia.id_facultad);
        this.form.get('id_procesos')?.setValue(evidencia.id_procesos);
        this.form.get('id_procesos')?.setValue(evidencia.id_procesos);
        this.form.get('id_impacto')?.setValue(evidencia.id_impacto);
        this.form.get('id_estado')?.setValue(evidencia.id_estado);
 
   
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
      });
  }


  editarEvidenciaaaaa(id: number, evidenciaEditada: any) {
    this.realizarOperacionDeEvidencia(() =>
      this.evidenciasService.updateEvidencia(id, evidenciaEditada), 'Evidencia editada');
  }


  
  eliminarEvidencia(id: number) {
    this.realizarOperacionDeEvidencia(() => 
    this.evidenciasService.deleteEvidencia(id), 'Evidencia eliminada');
  }
  private realizarOperacionDeEvidencia(operacion: () => any, mensajeExitoso: string) {
    operacion().subscribe({
      next: (respuesta: any) => {
        console.log(`${mensajeExitoso} exitosamente`, respuesta);
        this.getUsers();
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

mostrarAgregarEditarEvidencia(id: number | null) {
  if (id !== null) {
    this.evidenciaId = id;
    this.obtenerEvidencia(id);
  } else {
    this.evidenciaId = null;
    this.form.reset();
  }
  this.mostrarFormularioAgregarEvidencia = true;
}
crearEditarEvidencia() {
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

    if (this.evidenciaId) {
      const idEvidenciaEditar = this.form.get('id_evidencia')?.value;

      const evidenciaEditada = {
        id_evidencia: idEvidenciaEditar,
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
        //archivo_adjunto: archivo_adjunto,
        fecha_creacion: this.getCurrentDateTime(),
      };

      this.evidenciasService.updateEvidencia(idEvidenciaEditar, evidenciaEditada).subscribe({
        next: (response) => {
          console.log('Evidencia editada con éxito', response);
          this.toastr.success('Evidencia editada con éxito', 'Éxito');
          this.form.reset();
          this.imagenesAdjuntas = [];
          this.router.navigate(['/evidencias']);
        },
        error: (error) => {
          console.error('Error al editar la evidencia', error);
          this.toastr.error('Error al editar la evidencia', 'Error');
        }
      });
    } else {
      const archivosAdjuntos: FileList | null = this.form.get('archivo_adjunto')?.value;
      const fecha_creacion = this.getCurrentDateTime();
      this.form.get('fecha_creacion')?.setValue(fecha_creacion);

      if (archivosAdjuntos && archivosAdjuntos.length > 0) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as ArrayBuffer;
          const uintArray = new Uint8Array(result);
          const archivo_adjunto = uintArray;

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
            archivo_adjunto: archivo_adjunto,
            fecha_creacion: this.getCurrentDateTime(),
          }).subscribe({
            next: (response) => {
              console.log('Evidencia creada con éxito', response);
              this.toastr.success('Evidencia creada con éxito', 'Éxito');
              this.form.reset();
              this.imagenesAdjuntas = [];
              this.router.navigate(['/evidencias']);
            },
            error: (error) => {
              console.error('Error al crear la evidencia', error);
              this.toastr.error('Error al crear la evidencia', 'Error');
            }
          });
        };

        reader.readAsArrayBuffer(archivosAdjuntos[0]);
      } else {
        console.error('No se ha seleccionado ningún archivo.');
        this.toastr.error('No se ha seleccionado ningún archivo.', 'Error');
      }
    }
  } else {
    console.error('Formulario no válido. Verifica los campos.');
    this.toastr.error('Formulario no válido. Verifica los campos.', 'Error');
  }
  this.mostrarFormularioAgregarEvidencia = false;
  this.cancelarEdicionEvidencia();
}
cancelarEdicionEvidencia() {
  this.mostrarFormularioAgregarEvidencia = false;
  this.evidenciaId = null;
  this.form.reset();
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

}


  