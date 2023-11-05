import { Component, OnInit } from '@angular/core';
import { FacultadService } from '../../services/facultad.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Facultad } from '../../interfaces/facultad.interface';

@Component({
  selector: 'app-lista-facultades',
  templateUrl: './lista-facultad.component.html',
  styleUrls: ['./lista-facultad.component.css', '../../../shared-styles.css']
})

export class ListaFacultadComponent implements OnInit {
  facultades: Facultad[] = [];
  facultadOriginal: Facultad[] | null = null;
  errorMsg: string | undefined;
  form: FormGroup;
  sideNavStatus: boolean = false;
  editFacultadId: number | null = null;
  mostrarFormularioAgregarFacultad: boolean = false;
  private facultadesSubscription!: Subscription;
  currentPage: number = 1;
  searchTerm: string = '';

  constructor(private FacultadService: FacultadService, private toastr: ToastrService) {
    this.form = new FormGroup({
      nombre_facultad: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.actualizarListaDeFacultades();
  }

  mostrarFormularioAgregarEditarFacultad(id: number | null) {
    if (id !== null) {
      this.editFacultadId = id;
      this.obtenerFacultad(id);
    } else {
      this.editFacultadId = null;
      this.form.reset();
    }
    this.mostrarFormularioAgregarFacultad = true;
  }

  cancelarEdicion() {
    this.mostrarFormularioAgregarFacultad = false;
    this.editFacultadId = null;
    this.form.reset();
  }

  crearNuevoFacultad() {
    if (this.form.valid) {
      const nombreFacultad = this.form.get('nombre_facultad')?.value;
  
      if (this.nombreFacultadExistente(nombreFacultad)) {
        this.toastr.error('Ya existe una facultad con ese nombre', 'Error');
      } else if (this.editFacultadId) {
        this.editarFacultad(this.editFacultadId, nombreFacultad);
      } else {
          this.errorMsg = undefined;
          this.realizarOperacionDeFacultad(() => 
            this.FacultadService.createFacultad(nombreFacultad), 'Facultad Creada');
        
      }
    }
  
    this.mostrarFormularioAgregarFacultad = false;
    this.cancelarEdicion()
  }
  

  nombreFacultadExistente(nombre: string): boolean {
    return this.facultades.some(facultad => facultad.nombre_facultad === nombre);
  }

  obtenerFacultad(id: number) {
    this.FacultadService.getFacultad(id).subscribe((facultad: Facultad) => {
      if (facultad) {
        this.form.get('nombre_facultad')?.setValue(facultad.nombre_facultad);
      }
    });
  }

  realizarBusquedaFacultad() {
    if (this.searchTerm) {
      this.currentPage = 1;
      this.actualizarListaDeFacultades(); 
    } else {

      if (this.facultadOriginal) {
        this.facultades = this.facultadOriginal;
      }
    }
  }

  pageChanged(page: number) {
    this.currentPage = page;
  }


  actualizarListaDeFacultades() {
    if (this.facultadesSubscription) {
      this.facultadesSubscription.unsubscribe();
    }
    this.facultadesSubscription = this.FacultadService.getFacultades()
      .pipe(
        catchError(error => {
          console.error('Error al obtener facultades:', error);
          return [];
        })
      )
      .subscribe((data: Facultad[]) => {
        if(!this.facultadOriginal){
        this.facultadOriginal = data;
        }
        this.facultades = data.filter(facultad => {
          return (
            this.comienzaConCadena(facultad.id_facultad.toString(), this.searchTerm) ||
            this.comienzaConCadena(facultad.nombre_facultad, this.searchTerm)
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

  editarFacultad(id: number, nombre: string) {
    this.realizarOperacionDeFacultad(() => 
      this.FacultadService.updateFacultad(id, nombre), 'Facultad Editada');
  }

  eliminarFacultad(id: number) {
    this.realizarOperacionDeFacultad(() => 
      this.FacultadService.deleteFacultad(id), 'Facultad Eliminado');
  }
  
  private realizarOperacionDeFacultad(operacion: () => any, mensajeExitoso: string) {
    operacion().subscribe({
      next: (respuesta: any) => {
        console.log(`${mensajeExitoso} exitosamente`, respuesta);
        this.actualizarListaDeFacultades();
        this.toastr.warning(`La facultad fue ${mensajeExitoso.toLowerCase()} con éxito`, mensajeExitoso);
      },
      error: (error: any) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error(`Error al ${mensajeExitoso.toLowerCase()} la facultad`, error);
        }
      }
    });
  }
}