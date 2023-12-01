import { Component, OnInit } from '@angular/core';
import { EstadoService } from '../../services/estado.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Estado } from '../../interfaces/estado.interface';

@Component({
  selector: 'app-lista-estado',
  templateUrl: './lista-estado.component.html',
  styleUrls: ['./lista-estado.component.css', '../../../shared-styles.css']
})
export class ListaEstadoComponent implements OnInit {
  estados: Estado[] = [];
  estadosOriginal: Estado[] | null = null;
  errorMsg: string | undefined;
  form: FormGroup;
  sideNavStatus: boolean = false;
  editEstadoId: number | null = null;
  mostrarFormularioAgregarEstado: boolean = false;
  private estadosSubscription!: Subscription;
  currentPage: number = 1;
  searchTerm: string = '';

  constructor(private estadoService: EstadoService, private toastr: ToastrService) {
    this.form = new FormGroup({
      online_presencial: new FormControl('', [Validators.required]) 
    });
  }

  ngOnInit() {
    this.actualizarListaDeEstados();
  }

  mostrarFormularioAgregarEditarEstado(id: number | null) {
    if (id !== null) {
      this.editEstadoId = id;
      this.obtenerEstado(id);
    } else {
      this.editEstadoId = null;
      this.form.reset();
    }
    this.mostrarFormularioAgregarEstado = true;
  }

  cancelarEdicion() {
    this.mostrarFormularioAgregarEstado = false;
    this.editEstadoId = null;
    this.form.reset();
  }

  crearNuevoEstado() {
    if (this.form.valid) {
      const online_presencial = this.form.get('online_presencial')?.value;
      
      if (this.nombreEstadoExistente(online_presencial)) {
        this.toastr.error('Ya existe un estado con esa descripción', 'Error');
      } else if (this.editEstadoId) {
        this.editarEstado(this.editEstadoId, online_presencial);
      } else {
        this.errorMsg = undefined;
        this.realizarOperacionDeEstado(() => 
          this.estadoService.nuevoEstado(online_presencial), 'Estado Creado');
      }
    }
    this.mostrarFormularioAgregarEstado = false;
    this.cancelarEdicion();
  }

  nombreEstadoExistente(online_presencial: string): boolean {
    return this.estados.some(estado => estado.online_presencial === online_presencial);
  }

  obtenerEstado(id: number) {
    this.estadoService.obtenerEstadoPorId(id).subscribe((estado: Estado) => {
      if (estado) {
        this.form.get('online_presencial')?.setValue(estado.online_presencial);
      }
    });
  }

  realizarBusqueda() {
    if (this.searchTerm) {
      this.currentPage = 1;
      this.actualizarListaDeEstados(); 
    } else {
      if (this.estadosOriginal) {
        this.estados = this.estadosOriginal;
      }
    }
  }

  pageChanged(page: number) {
    this.currentPage = page;
  }

  actualizarListaDeEstados() {
    if (this.estadosSubscription) {
      this.estadosSubscription.unsubscribe();
    }
    this.estadosSubscription = this.estadoService.obtenerEstado()
      .pipe(
        catchError(error => {
          console.error('Error al obtener estados:', error);
          return [];
        })
      )
      .subscribe((data: Estado[]) => {
        if (!this.estadosOriginal) {
          this.estadosOriginal = data;
        }
        
        this.estados = data.filter(estado => {
          return (
            this.comienzaConCadena(estado.id_estado.toString(), this.searchTerm) ||
            this.comienzaConCadena(estado.online_presencial, this.searchTerm)
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
  
  editarEstado(id: number, online_presencial: string) {
    this.realizarOperacionDeEstado(() => 
      this.estadoService.actualizarEstado(id, online_presencial), 'Estado Editado');
  }

  eliminarEstado(id: number) {
    this.realizarOperacionDeEstado(() => 
      this.estadoService.eliminarEstado(id), 'Estado Eliminado');
  }
  
  private realizarOperacionDeEstado(operacion: () => any, mensajeExitoso: string) {
    operacion().subscribe({
      next: (respuesta: any) => {
        console.log(`${mensajeExitoso} exitosamente`, respuesta);
        this.actualizarListaDeEstados();
        this.toastr.warning(`El estado fue ${mensajeExitoso.toLowerCase()} con éxito`, mensajeExitoso);
      },
      error: (error: any) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error(`Error al ${mensajeExitoso.toLowerCase()} el estado`, error);
        }
      }
    });
  }
}
