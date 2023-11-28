import { Component, OnInit } from '@angular/core';
import { ImpactoService } from '../../services/impacto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Impacto } from '../../interfaces/impacto.interface';
@Component({
  selector: 'app-lista-impacto',
  templateUrl: './lista-impacto.component.html',
  styleUrls: ['./lista-impacto.component.css', '../../../shared-styles.css']
})
export class ListaImpactoComponent implements OnInit {
  impactos: Impacto[] = [];
  impactosOriginal: Impacto[] | null = null;
  errorMsg: string | undefined;
  form: FormGroup;
  sideNavStatus: boolean = false;
  editImpactoId: number | null = null;
  mostrarFormularioAgregarImpacto: boolean = false;
  private impactosSubscription!: Subscription;
  currentPage: number = 1;
  searchTerm: string = '';

  constructor(private impactoService: ImpactoService, private toastr: ToastrService) {
    this.form = new FormGroup({
      interno_externo: new FormControl('', [Validators.required]) 
    });
  }

  ngOnInit() {
    this.actualizarListaDeImpactos();
  }

  mostrarFormularioAgregarEditarImpacto(id: number | null) {
    if (id !== null) {
      this.editImpactoId = id;
      this.obtenerImpacto(id);
    } else {
      this.editImpactoId = null;
      this.form.reset();
    }
    this.mostrarFormularioAgregarImpacto = true;
  }

  cancelarEdicion() {
    this.mostrarFormularioAgregarImpacto = false;
    this.editImpactoId = null;
    this.form.reset();
  }

  crearNuevoImpacto() {
    if (this.form.valid) {
      const interno_externo = this.form.get('interno_externo')?.value;
      
      if (this.nombreImpactoExistente(interno_externo)) {
        this.toastr.error('Ya existe un impacto con esa descripción', 'Error');
      } else if (this.editImpactoId) {
        this.editarImpacto(this.editImpactoId, interno_externo);
      } else {
        this.errorMsg = undefined;
        this.realizarOperacionDeImpacto(() => 
          this.impactoService.nuevaImpacto(interno_externo), 'Impacto Creado');
      }
    }
    this.mostrarFormularioAgregarImpacto = false;
    this.cancelarEdicion();
  }

  nombreImpactoExistente(interno_externo: string): boolean {
    return this.impactos.some(impacto => impacto.interno_externo === interno_externo);
  }

  obtenerImpacto(id: number) {
    this.impactoService.obtenerImpactoPorId(id).subscribe((impacto: Impacto) => {
      if (impacto) {
        this.form.get('interno_externo')?.setValue(impacto.interno_externo);
      }
    });
  }

  realizarBusqueda() {
    if (this.searchTerm) {
      this.currentPage = 1;
      this.actualizarListaDeImpactos(); 
    } else {
      if (this.impactosOriginal) {
        this.impactos = this.impactosOriginal;
      }
    }
  }

  pageChanged(page: number) {
    this.currentPage = page;
  }

  actualizarListaDeImpactos() {
    if (this.impactosSubscription) {
      this.impactosSubscription.unsubscribe();
    }
    this.impactosSubscription = this.impactoService.obtenerImpacto()
      .pipe(
        catchError(error => {
          console.error('Error al obtener impactos:', error);
          return [];
        })
      )
      .subscribe((data: Impacto[]) => {
        if (!this.impactosOriginal) {
          this.impactosOriginal = data;
        }
        
        this.impactos = data.filter(impacto => {
          return (
            this.comienzaConCadena(impacto.id_impacto.toString(), this.searchTerm) ||
            this.comienzaConCadena(impacto.interno_externo, this.searchTerm)
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
  
  editarImpacto(id: number, interno_externo: string) {
    this.realizarOperacionDeImpacto(() => 
      this.impactoService.actualizarImpacto(id, interno_externo), 'Impacto Editado');
  }

  eliminarImpacto(id: number) {
    this.realizarOperacionDeImpacto(() => 
      this.impactoService.eliminarImpacto(id), 'Impacto Eliminado');
  }
  
  private realizarOperacionDeImpacto(operacion: () => any, mensajeExitoso: string) {
    operacion().subscribe({
      next: (respuesta: any) => {
        console.log(`${mensajeExitoso} exitosamente`, respuesta);
        this.actualizarListaDeImpactos();
        this.toastr.warning(`El impacto fue ${mensajeExitoso.toLowerCase()} con éxito`, mensajeExitoso);
      },
      error: (error: any) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error(`Error al ${mensajeExitoso.toLowerCase()} el impacto`, error);
        }
      }
    });
  }
}