import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AmbitoAService } from 'src/app/services/ambito-a.service';

interface AmbitoAcademico {
  id_ambito_academico: number;
  nombre_ambito_academico: string;
  estado_ambito_academico: boolean;
}

@Component({
  selector: 'app-lista-ambitos-a',
  templateUrl: './lista-ambitos-a.component.html',
  styleUrls: ['./lista-ambitos-a.component.css', '../../../shared-styles.css']
})
export class ListaAmbitosAComponent implements OnInit {
  ambitosAcademicos: AmbitoAcademico[] = [];
  errorMsg: string | undefined;
  form: FormGroup;
  ambitoAcademicoEditId: number | null = null;
  sideNavStatus: boolean = false;
  mostrarFormularioAgregarAmbitoAcademico: boolean = false;

  constructor(
    private ambitoAService: AmbitoAService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      nombre_ambito_academico: ['', [Validators.required]],
      estado_ambito_academico: [true, [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.ambitoAcademicoEditId = id;
        this.obtenerAmbitoAcademico(id);
      }
    });
    this.actualizarListaDeAmbitosAcademicos();
  }

  mostrarAgregarEditarAmbitoAcademico(id: number | null) {
    if (id !== null) {
      this.ambitoAcademicoEditId = id;
      this.obtenerAmbitoAcademico(id);
    } else {
      this.ambitoAcademicoEditId = null;
      this.form.reset();
    }
    this.mostrarFormularioAgregarAmbitoAcademico = true;
  }

  cancelarEdicionAmbitoAcademico() {
    this.mostrarFormularioAgregarAmbitoAcademico = false;
    this.ambitoAcademicoEditId = null;
    this.form.reset();
  }

  guardarAmbitoAcademico(event: Event) {
    if (this.form.valid) {
      const nombreAmbitoAcademico = this.form.get('nombre_ambito_academico')?.value;
      const estadoAmbitoAcademico = this.form.get('estado_ambito_academico')?.value;

      if (this.ambitoAcademicoEditId) {
        this.editarAmbitoAcademico(this.ambitoAcademicoEditId, nombreAmbitoAcademico, estadoAmbitoAcademico);
      } else {
        this.crearAmbitoAcademico(nombreAmbitoAcademico, estadoAmbitoAcademico);
      }

      this.mostrarFormularioAgregarAmbitoAcademico = false;
    }
  }

  obtenerAmbitoAcademico(id: number) {
    this.ambitoAService.getAmbitoAcademico(id).subscribe((ambito) => {
      if (ambito) {
        this.form.get('nombre_ambito_academico')?.setValue(ambito.nombre_ambito_academico);
        this.form.get('estado_ambito_academico')?.setValue(ambito.estado_ambito_academico);
      }
    });
  }

  actualizarListaDeAmbitosAcademicos() {
    this.ambitoAService.getAmbitosAcademicos().subscribe((ambitoData) => {
      this.ambitosAcademicos = ambitoData;
      this.form.get('nombre_ambito_academico')?.setValue('');
    });
  }

  editarAmbitoAcademico(id: number, nombreAmbitoAcademico: string, estadoAmbitoAcademico: boolean) {
    this.ambitoAService.updateAmbitoAcademico(id, {
      nombre_ambito_academico: nombreAmbitoAcademico,
      estado_ambito_academico: estadoAmbitoAcademico
    }).subscribe({
      next: (respuesta) => {
        this.procesarRespuestaExitosa(respuesta, 'Ámbito académico actualizado exitosamente', 'El ámbito académico fue editado correctamente', 'Ámbito Académico Editado');
      },
      error: (error) => {
        this.procesarError(error, 'Error al actualizar el ámbito académico', 'Error al actualizar el estado del ámbito académico');
      }
    });
  }

  crearAmbitoAcademico(nombreAmbitoAcademico: string, estadoAmbitoAcademico: boolean) {
    this.ambitoAService.newAmbitoAcademico({
      nombre_ambito_academico: nombreAmbitoAcademico,
      estado_ambito_academico: estadoAmbitoAcademico
    }).subscribe({
      next: (respuesta) => {
        this.procesarRespuestaExitosa(respuesta, 'Ámbito académico creado exitosamente', 'El ámbito académico fue creado con éxito', 'Ámbito Académico Creado');
      },
      error: (error) => {
        this.procesarError(error, 'Error al crear el ámbito académico', 'Error al crear el ámbito académico');
      }
    });
  }

  eliminarAmbitoAcademico(id: number) {
    if (id) {
      this.ambitoAService.deleteAmbitoAcademico(id).subscribe({
        next: (respuesta) => {
          this.procesarRespuestaExitosa(respuesta, 'Ámbito académico eliminado exitosamente', 'El ámbito académico fue eliminado correctamente', 'Ámbito Académico Eliminado');
        },
        error: (error) => {
          this.procesarError(error, 'Error al eliminar el ámbito académico', 'Error al eliminar el ámbito académico');
        }
      });
    } else {
      console.error('ID de ámbito académico no válido');
    }
  }

  cambiarEstadoAmbitoAcademico(id: number) {
    const ambito = this.ambitosAcademicos.find((ambito) => ambito.id_ambito_academico === id);

    if (ambito) {
      ambito.estado_ambito_academico = !ambito.estado_ambito_academico;
      this.ambitoAService.updateAmbitoAcademico(id, {
        estado_ambito_academico: ambito.estado_ambito_academico,
      }).subscribe({
        next: (respuesta) => {
          this.procesarRespuestaExitosa(respuesta, 'Estado del ámbito académico actualizado exitosamente', 'El estado del ámbito académico ha sido cambiado', 'Estado Cambiado');
        },
        error: (error) => {
          this.procesarError(error, 'Error al actualizar el estado del ámbito académico', 'Error al actualizar el estado del ámbito académico');
        },
      });
    }
  }

  private procesarRespuestaExitosa(respuesta: any, logMessage: string, toastrMessage: string, toastrTitle: string) {
    console.log(logMessage, respuesta);
    this.actualizarListaDeAmbitosAcademicos();
    this.toastr.success(toastrMessage, toastrTitle);
  }

  private procesarError(error: any, logMessage: string, toastrMessage: string) {
    if (error && error.msg) {
      this.errorMsg = error.msg;
      console.error(logMessage, error);
    }
  }
}
