import { Component, OnInit } from '@angular/core';
import { UnidadService } from '../../services/unidad.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Unidad } from 'src/app/interfaces/unidad.interface';

@Component({
  selector: 'app-lista-unidad',
  templateUrl: './lista-unidad.component.html',
  styleUrls: ['./lista-unidad.component.css', '../../../shared-styles.css']
})

export class ListaUnidadComponent implements OnInit {
  unidades: Unidad[] = [];
  unidadOriginal: Unidad[] | null = null;
  errorMsg: string | undefined;
  form: FormGroup;
  sideNavStatus: boolean = false;
  unidadEditId: number | null = null;
  mostrarFormularioAgregarUnidad: boolean = false;
  private unidadesSubscription!: Subscription;
  currentPage: number = 1;
  searchTerm: string = '';

  constructor(
    private unidadService: UnidadService, 
    private toastr: ToastrService) {
    this.form = new FormGroup({
      nombre_unidad: new FormControl('', [Validators.required]),
      unidad_defecto: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.actualizarListaDeUnidades();
  }


  mostrarAgregarEditarUnidad(id: number | null) {
    if (id !== null) {
      this.unidadEditId = id;
      this.obtenerUnidad(id);
    } else {
      this.unidadEditId = null;
      this.form.reset();
    }
    this.mostrarFormularioAgregarUnidad = true;
  }

  cancelarEdicion() {
    this.mostrarFormularioAgregarUnidad = false;
    this.unidadEditId = null;
    this.form.reset();
  }
  
  crearOEditarUnidad() {
    if (this.form.valid) {
      const nombreUnidad = this.form.get('nombre_unidad')?.value;
      
      if (this.unidadEditId) {
        const unidadEditada: any = {
          id_unidad: this.unidadEditId,
        };
        if (this.form.get('nombre_unidad')?.dirty) {
          unidadEditada['nombre_unidad'] = nombreUnidad;
        }
        unidadEditada['unidad_defecto'] = this.form.get('unidad_defecto')?.value;

        this.editarUnidad(this.unidadEditId, unidadEditada);
      } else {
        const unidadDefecto = this.form.get('unidad_defecto')?.value;
        if (this.nombreUnidadExistente(nombreUnidad)) {
          this.toastr.error('El nombre de la unidad ya existe', 'Error');
        } else {
          this.realizarOperacionDeUnidad(() =>
            this.unidadService.createUnidad({ nombre_unidad: nombreUnidad, unidad_defecto: unidadDefecto }), 'Unidad Creada');
        }
      }
    }
    this.mostrarFormularioAgregarUnidad = false;
    this.cancelarEdicion()
  }
  
  

  nombreUnidadExistente(nombre: string): boolean {
    return this.unidades.some(unidad => unidad.nombre_unidad === nombre);
  }
  

  obtenerUnidad(id: number) {
    this.unidadService.getUnidad(id).subscribe(unidad => {
      if (unidad) {
        this.form.get('nombre_unidad')?.setValue(unidad.nombre_unidad);
        this.form.get('unidad_defecto')?.setValue(unidad.unidad_defecto);
      }
    });
  }

  realizarBusquedaUnidad() {
    if (this.searchTerm) {
      this.currentPage = 1;
      this.actualizarListaDeUnidades(); 
    } else {

      if (this.unidadOriginal) {
        this.unidades = this.unidadOriginal;
      }
    }
  }

  pageChanged(page: number) {
    this.currentPage = page;
  }


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
      .subscribe((data: Unidad[]) => {
        if(!this.unidadOriginal){
          this.unidadOriginal= data;
        }
        this.unidades= data.filter(unidad => {
          return (
            this.comienzaConCadena(unidad.id_unidad.toString(), this.searchTerm) ||
            this.comienzaConCadena(unidad.nombre_unidad, this.searchTerm)
          );
        });
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

  editarUnidad(id: number, unidadEditada: any) {
      this.realizarOperacionDeUnidad(() => 
      this.unidadService.updateUnidad(id,  unidadEditada ), 'Unidad Editada');
  }
  
  cambiarEstadoUnidad(id: number) {
    const unidad = this.unidades.find(u => u.id_unidad === id);

    if (unidad) {
      const nuevoEstado = !unidad.unidad_defecto;

      this.realizarOperacionDeUnidad(() => this.unidadService.updateUnidad(id, { unidad_defecto: nuevoEstado }), 'Estado Cambiado');
    }
  }

  eliminarUnidad(id: number) {
    this.realizarOperacionDeUnidad(() => this.unidadService.deleteUnidad(id), 'Unidad Eliminada');
  }

  private realizarOperacionDeUnidad(operacion: () => any, mensajeExitoso: string) {
    operacion().subscribe({
      next: (respuesta: any) => {
        console.log(`${mensajeExitoso} exitosamente`, respuesta);
        this.actualizarListaDeUnidades();
        this.toastr.warning(`La unidad fue ${mensajeExitoso.toLowerCase()} con éxito`, mensajeExitoso);
      },
      error: (error: any) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error(`Error al ${mensajeExitoso.toLowerCase()} la unidad`, error);
        }
      }
    });
  }
}
