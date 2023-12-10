import { Component, OnInit } from '@angular/core';
import { DebilidadService } from 'src/app/services/debilidad.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Debilidad } from 'src/app/interfaces/debilidades.interface';

@Component({
  selector: 'app-lista-debilidad',
  templateUrl: './lista-debilidad.component.html',
  styleUrls: ['./lista-debilidad.component.css', '../../../shared-styles.css']
})
export class ListaDebilidadComponent {
  debilidades: Debilidad[] = [];
  debilidadOriginal: Debilidad[] | null = null;
  errorMsg: string | undefined;
  form: FormGroup;
  sideNavStatus: boolean = false;
  debilidadEditId: number | null = null;
  mostrarFormularioAgregarDebilidad: boolean = false;
  private debilidadesSubscription!: Subscription;
  currentPage: number = 1;
  searchTerm: string = '';

  constructor(
    private debilidadService: DebilidadService,
    private toastr: ToastrService) {
      this.form = new FormGroup({
        descripcion_debilidades: new FormControl('', [Validators.required]),
        estado_debilidades: new FormControl(null, [Validators.required]),
        id_criterios: new FormControl(null, [Validators.required])
      });
  }

  ngOnInit() {
    this.actualizarListaDeDebilidades();
  }


  mostrarAgregarEditarDebilidad(id: number | null) {
    if (id !== null) {
      this.debilidadEditId = id;
      this.obtenerDebilidad(id);
    } else {
      this.debilidadEditId = null;
      this.form.reset();
    }
    this.mostrarFormularioAgregarDebilidad = true;
  }

  cancelarEdicionDebilidad() {
    this.mostrarFormularioAgregarDebilidad = false;
    this.debilidadEditId = null;
    this.form.reset();
  }

  crearOEditarDebilidad() {
    if (this.form.valid) {
      const descripcion_debilidades = this.form.get('descripcion_debilidades')?.value;
      const estado_debilidades = this.form.get('estado_debilidades')?.value;
      const id_criterios = this.form.get('id_criterios')?.value;
  
      if (this.debilidadEditId) {
        this.editarDebilidad(this.debilidadEditId, descripcion_debilidades, estado_debilidades, id_criterios);
      } else {
        this.realizarOperacionDeDebilidad(() =>
          this.debilidadService.nuevaDebilidad({ 
            descripcion_debilidades: descripcion_debilidades, 
            estado_debilidades: estado_debilidades,
            id_criterio: id_criterios 
          }), 'Evidencia Creada');
      }
  
      this.mostrarFormularioAgregarDebilidad = false;
      this.cancelarEdicionDebilidad();
    }
  }
  obtenerDebilidad(id: number) {
    this.debilidadService.obtenerDebilidadPorId(id).subscribe((debilidad) => {
      if (debilidad) {
        this.form.get('descripcion_debilidades')?.setValue(debilidad.descripcion_debilidades);
        this.form.get('estado_debilidades')?.setValue(debilidad.estado_debilidades);
        this.form.get('id_criterios')?.setValue(debilidad.id_criterios);
      }
    });
  }
  
  realizarBusquedaDebilidad() {
    if (this.searchTerm) {
      this.currentPage = 1;
      this.actualizarListaDeDebilidades();
    } else {
      if (this.debilidadOriginal) {
        this.debilidades = this.debilidadOriginal;
      }
    }
  }
  
  pageChanged(page: number) {
    this.currentPage = page;
  }

  actualizarListaDeDebilidades() {
    if (this.debilidadesSubscription) {
      this.debilidadesSubscription.unsubscribe();
    }
    this.debilidadesSubscription = this.debilidadService.obtenerDebilidad()
      .pipe(
        catchError(error => {
          console.error('Error al obtener Debilidades:', error);
          return [];
        })
      )
      .subscribe((data: Debilidad[]) => {
        if (!this.debilidadOriginal) {
          this.debilidadOriginal = data;
        }
        this.debilidades = data.filter(debilidad => {
          return (
            this.comienzaConCadena(debilidad.id_debilidades.toString(), this.searchTerm)
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

  
  editarDebilidad(id: number, descripcion_debilidades: string, estado_debilidades: boolean, id_criterios: number) {
    this.realizarOperacionDeDebilidad(() =>
      this.debilidadService.actualizarDebilidad(id, {
        descripcion_debilidades: descripcion_debilidades,
        estado_debilidades: estado_debilidades,
        id_criterios: id_criterios
      }), 'Debilidad Editada');
  }
  
  eliminarDebilidad(id: number) {
    this.realizarOperacionDeDebilidad(() => this.debilidadService.eliminarDebilidad(id), 'Debilidad Eliminada');
  }
  
  cambiarEstadoDebilidad(id: number) {
    const debilidad = this.debilidades.find(d => d.id_debilidades === id);
  
    if (debilidad) {
      const nuevoEstado = !debilidad.estado_debilidades;
  
      this.realizarOperacionDeDebilidad(() =>
        this.debilidadService.actualizarDebilidad(id, { estado_debilidades: nuevoEstado }), 'Estado Cambiado');
    }
  }
  
  private realizarOperacionDeDebilidad(operacion: () => any, mensajeExitoso: string) {
    operacion().subscribe({
      next: (respuesta: any) => {
        console.log(`${mensajeExitoso} exitosamente`, respuesta);
        this.actualizarListaDeDebilidades();
        this.toastr.warning(`La debilidad fue ${mensajeExitoso.toLowerCase()} con éxito`, mensajeExitoso);
      },
      error: (error: any) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error(`Error al ${mensajeExitoso.toLowerCase()} la debilidad`, error);
        }
      }
    });
  }
}  