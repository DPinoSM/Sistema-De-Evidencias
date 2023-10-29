import { Component, OnInit } from '@angular/core';
import { UnidadService } from '../../services/unidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-unidad',
  templateUrl: './lista-unidad.component.html',
  styleUrls: ['./lista-unidad.component.css', '../../../shared-styles.css']
})
export class ListaUnidadComponent implements OnInit {
  unidades: any[] = []; // Almacena la lista de unidades.
  nombreUnidad: string = ''; // Almacena el nombre de la unidad.
  errorMsg: string | undefined; // Almacena mensajes de error.
  form: FormGroup; // Formulario para agregar y editar unidades.
  unidadEditId: number | null = null; // ID de la unidad que se está editando, si es nulo, se agrega una nueva unidad.
  sideNavStatus: boolean = false; // Estado de la barra lateral.
  mostrarFormularioAgregarUnidad: boolean = false; // Indica si se debe mostrar el formulario de agregar/editar unidad.
  private unidadesSubscription!: Subscription; // Suscripción a la lista de unidades.

  constructor(
    private unidadService: UnidadService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    // Inicializa el formulario y sus validaciones.
    this.form = this.formBuilder.group({
      nombre_unidad: ['', [Validators.required]],
      unidad_defecto: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    // Carga la lista de unidades al inicializar el componente.
    this.actualizarListaDeUnidades();
  }

  // Muestra el formulario para agregar o editar una unidad.
  mostrarAgregarEditarUnidad(id: number | null) {
    if (id !== null) {
      this.unidadEditId = id;
      this.obtenerUnidad(id); // Obtiene los detalles de la unidad para editar.
    } else {
      this.unidadEditId = null;
      this.form.reset();
    }
    this.mostrarFormularioAgregarUnidad = true;
  }

  // Cancela la edición y oculta el formulario.
  cancelarEdicion() {
    this.mostrarFormularioAgregarUnidad = false;
    this.unidadEditId = null;
    this.form.reset();
  }

  // Guarda una nueva unidad o actualiza una existente.
  guardarUnidad(event: Event) {
    if (this.form.valid) {
      const nombreUnidad = this.form.get('nombre_unidad')?.value;
      const unidadDefecto = this.form.get('unidad_defecto')?.value;

      if (this.unidadEditId) {
        this.editarUnidad(this.unidadEditId, nombreUnidad); // Edita una unidad existente.
      } else {
        this.unidadService.createUnidad({
          nombre_unidad: nombreUnidad,
          unidad_defecto: unidadDefecto
        }).subscribe({
          next: (respuesta) => {
            console.log('Unidad creada exitosamente', respuesta);
            this.actualizarListaDeUnidades();
            this.toastr.warning('La unidad fue creada con éxito', 'Unidad Creada');
          },
          error: (error) => {
            if (error && error.msg) {
              this.errorMsg = error.msg;
              console.error('Error al crear la unidad', error);
            }
          }
        });
      }

      this.mostrarFormularioAgregarUnidad = false;
    }
  }

  // Obtiene los detalles de una unidad para editar.
  obtenerUnidad(id: number) {
    this.unidadService.getUnidad(id).subscribe(unidad => {
      if (unidad) {
        this.form.get('nombre_unidad')?.setValue(unidad.nombre_unidad);
        this.form.get('unidad_defecto')?.setValue(unidad.unidad_defecto);
      }
    });
  }

  // Actualiza la lista de unidades.
  actualizarListaDeUnidades() {
    if (this.unidadesSubscription) {
      this.unidadesSubscription.unsubscribe();
    }
    this.unidadesSubscription = this.unidadService.getUnidades()
      .pipe(
        catchError(error => {
          console.error('Error al obtener unidades:', error);
          return [];
        })
      )
      .subscribe((data: any) => {
        this.unidades = data;
      });
  }

  // Edita una unidad existente.
  editarUnidad(id: number, nombre_unidad: string) {
    const unidad_defecto = this.form.get('unidad_defecto')?.value; 
    this.unidadService.updateUnidad(id, {
      nombre_unidad: nombre_unidad,
      unidad_defecto: unidad_defecto 
    }).subscribe({
      next: (respuesta) => {
        console.log('Unidad actualizada exitosamente', respuesta);
        this.actualizarListaDeUnidades();
        this.toastr.warning('La unidad fue editada correctamente', 'Unidad Editada');
      },
      error: (error) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error('Error al actualizar la unidad', error);
        }
      }
    });
  }

  // Cambia el estado de una unidad (activo o inactivo).
  cambiarEstadoUnidad(id: number) {
    const unidad = this.unidades.find(u => u.id_unidad === id);
  
    if (unidad) {
      const nuevoEstado = !unidad.unidad_defecto; 
  
      this.unidadService.updateUnidad(id, {
        unidad_defecto: nuevoEstado
      }).subscribe({
        next: (respuesta) => {
          console.log('Estado de la unidad actualizado exitosamente', respuesta);
          unidad.unidad_defecto = nuevoEstado; 
          this.toastr.success('El estado de la unidad ha sido cambiado', 'Estado Cambiado');
        },
        error: (error) => {
          if (error && error.msg) {
            this.errorMsg = error.msg;
            console.error('Error al actualizar el estado de la unidad', error);
          }
        }
      });
    }
  }

  // Elimina una unidad.
  eliminarUnidad(id: number) {
    this.unidadService.deleteUnidad(id).subscribe(() => {
      this.actualizarListaDeUnidades();
      this.toastr.warning('La unidad fue eliminada con éxito', 'Unidad Eliminada');
    });
  }
}
