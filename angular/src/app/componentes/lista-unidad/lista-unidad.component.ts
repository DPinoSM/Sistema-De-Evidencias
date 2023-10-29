import { Component, OnInit } from '@angular/core';
import { UnidadService } from '../../services/unidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Unidad } from 'src/app/interfaces/unidad.interface';

@Component({
  selector: 'app-lista-unidad',
  templateUrl: './lista-unidad.component.html',
  styleUrls: ['./lista-unidad.component.css', '../../../shared-styles.css']
})
export class ListaUnidadComponent implements OnInit {
  unidades: any[] = [];
  errorMsg: string | undefined;
  form: FormGroup;
  unidadEditId: number | null = null;
  sideNavStatus: boolean = false;
  mostrarFormularioAgregarUnidad: boolean = false;
  private unidadesSubscription!: Subscription;

  constructor(
    private unidadService: UnidadService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      nombre_unidad: ['', [Validators.required]],
      unidad_defecto: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.actualizarListaDeUnidades();
  }

  mostrarAgregarEditarUnidad(id: number | null) {
    this.unidadEditId = id;
    if (id !== null) this.obtenerUnidad(id);
    else this.form.reset();
    this.mostrarFormularioAgregarUnidad = true;
  }

  cancelarEdicion() {
    this.mostrarFormularioAgregarUnidad = false;
    this.unidadEditId = null;
    this.form.reset();
  }

  guardarUnidad(event: Event) {
    if (this.form.valid) {
      const { nombre_unidad, unidad_defecto } = this.form.value;

      if (this.unidadEditId) this.editarUnidad(this.unidadEditId, nombre_unidad, unidad_defecto);
      else this.crearUnidad(nombre_unidad, unidad_defecto);
    }
    this.mostrarFormularioAgregarUnidad = false;
  }

  obtenerUnidad(id: number) {
    this.unidadService.getUnidad(id).subscribe(unidad => {
      if (unidad) this.form.patchValue(unidad);
    });
  }

  actualizarListaDeUnidades() {
    this.unidadesSubscription?.unsubscribe();
    this.unidadesSubscription = this.unidadService.getUnidades()
      .pipe(
        catchError(error => {
          console.error('Error al obtener unidades:', error);
          return [];
        }),
        tap((data: any) => {
          this.unidades = data;
        })
      )
      .subscribe();
  }

  editarUnidad(id: number, nombre_unidad: string, unidad_defecto: any) {
    this.unidadService.updateUnidad(id, { nombre_unidad, unidad_defecto }).subscribe({
      next: () => this.actualizarYMostrarMensaje('La unidad fue editada correctamente', 'Unidad Editada'),
      error: (error) => this.handleAPIError(error, 'Error al actualizar la unidad')
    });
  }

  crearUnidad(nombre_unidad: string, unidad_defecto: any) {
    this.unidadService.createUnidad({ nombre_unidad, unidad_defecto }).subscribe({
      next: () => this.actualizarYMostrarMensaje('La unidad fue creada con éxito', 'Unidad Creada'),
      error: (error) => this.handleAPIError(error, 'Error al crear la unidad')
    });
  }

  cambiarEstadoUnidad(id: number) {
    const unidad = this.unidades.find(u => u.id_unidad === id);

    if (unidad) {
      const nuevoEstado = !unidad.unidad_defecto;

      this.unidadService.updateUnidad(id, { unidad_defecto: nuevoEstado }).subscribe({
        next: () => {
          unidad.unidad_defecto = nuevoEstado;
          this.toastr.success('El estado de la unidad ha sido cambiado', 'Estado Cambiado');
        },
        error: (error) => this.handleAPIError(error, 'Error al actualizar el estado de la unidad')
      });
    }
  }

  eliminarUnidad(id: number) {
    this.unidadService.deleteUnidad(id).subscribe(() => {
      this.actualizarYMostrarMensaje('La unidad fue eliminada con éxito', 'Unidad Eliminada');
    });
  }

  private handleAPIError(error: any, message: string) {
    if (error && error.msg) {
      this.errorMsg = error.msg;
      console.error(message, error);
    }
  }

  private actualizarYMostrarMensaje(mensaje: string, mensajeTitulo: string) {
    this.actualizarListaDeUnidades();
    this.toastr.warning(mensaje, mensajeTitulo);
  }
}
