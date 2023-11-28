import { Component, OnInit } from '@angular/core';
import { CarreraService } from '../../services/carrera.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Carrera } from '../../interfaces/carrera.interface';

@Component({
  selector: 'app-listarcarreras',
  templateUrl: './lista-carrera.component.html',
  styleUrls: ['./lista-carrera.component.css', '../../../shared-styles.css']
})
export class ListaCarreraComponent implements OnInit {
  carreras: Carrera[] = [];
  carrerasOriginal: Carrera[] | null = null;
  errorMsg: string | undefined;
  form: FormGroup;
  sideNavStatus: boolean = false;
  editCarreraId: number | null = null;
  mostrarFormularioAgregarCarrera: boolean = false;
  private carrerasSubscription!: Subscription;
  currentPage: number = 1;
  searchTerm: string = '';

  constructor(private carreraService: CarreraService, private toastr: ToastrService) {
    this.form = new FormGroup({
      nombre_carrera: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      cantidad_matriculados: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.actualizarListaDeCarreras();
  }

  mostrarFormularioAgregarEditarCarrera(id: number | null) {
    if (id !== null) {
      this.editCarreraId = id;
      this.obtenerCarrera(id);
    } else {
      this.editCarreraId = null;
      this.form.reset();
    }
    this.mostrarFormularioAgregarCarrera = true;
  }

  cancelarEdicion() {
    this.mostrarFormularioAgregarCarrera = false;
    this.editCarreraId = null;
    this.form.reset();
  }

  createNewCarrera() {
    if (this.form.valid) {
      const nombre_carrera = this.form.get('nombre_carrera')?.value;
      const area = this.form.get('area')?.value;
      const cantidad_matriculados = this.form.get('cantidad_matriculados')?.value;
  
      if (this.editCarreraId) {
        const carreraEditada: any = {
          id_carrera: this.editCarreraId
        };
  
        if (this.form.get('nombre_carrera')?.dirty) {
          carreraEditada['nombre_carrera'] = nombre_carrera;
        }
        carreraEditada['area'] = this.form.get('area')?.value;
        carreraEditada['cantidad_matriculados'] = this.form.get('cantidad_matriculados')?.value;

        this.editCarrera(this.editCarreraId, carreraEditada);
      } else {
        if (this.nombreCarreraExistente(nombre_carrera)) {
          this.toastr.error('Ya existe una carrera con ese nombre', 'Error');
        } else {
          this.realizarOperacionDeCarrera(() =>
            this.carreraService.nuevaCarrera({
              nombre_carrera: nombre_carrera,
              area: area,
              cantidad_matriculados: cantidad_matriculados
            }),
            'Carrera Creada'
          );
        }
      }
    }
  
    this.mostrarFormularioAgregarCarrera = false;
    this.cancelarEdicion();
  }
  

  nombreCarreraExistente(nombre_carrera: string): boolean {
    return this.carreras.some(carrera => carrera.nombre_carrera === nombre_carrera);
  }

  obtenerCarrera(id: number) {
    this.carreraService.obtenerCarreraPorId(id).subscribe((carrera: Carrera) => {
      if (carrera) {
        this.form.setValue({
          nombre_carrera: carrera.nombre_carrera,
          area: carrera.area,
          cantidad_matriculados: carrera.cantidad_matriculados
        });
      }
    });
  }

  realizarBusqueda() {
    if (this.searchTerm) {
      this.currentPage = 1;
      this.actualizarListaDeCarreras(); 
    } else {
      if (this.carrerasOriginal) {
        this.carreras = this.carrerasOriginal;
      }
    }
  }

  pageChanged(page: number) {
    this.currentPage = page;
  }

  actualizarListaDeCarreras() {
    if (this.carrerasSubscription) {
      this.carrerasSubscription.unsubscribe();
    }
    this.carrerasSubscription = this.carreraService.obtenerCarreras()
      .pipe(
        catchError(error => {
          console.error('Error al obtener carreras:', error);
          return [];
        })
      )
      .subscribe((data: Carrera[]) => {
        if (!this.carrerasOriginal) {
          this.carrerasOriginal = data;
        }
        this.carreras = data.filter(carrera => {
          return (
            this.comienzaConCadena(carrera.id_carrera.toString(), this.searchTerm) ||
            this.comienzaConCadena(carrera.nombre_carrera, this.searchTerm) ||
            this.comienzaConCadena(carrera.area, this.searchTerm) ||
            (carrera.cantidad_matriculados && this.comienzaConCadena(carrera.cantidad_matriculados.toString(), this.searchTerm))
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

  editCarrera(id: number, carreraEditada: any) {
    this.realizarOperacionDeCarrera(() =>
      this.carreraService.actualizarCarrera(id, carreraEditada), 'Carrera Editada'
    );
  }

  eliminarCarrera(id: number) {
    this.realizarOperacionDeCarrera(() => 
      this.carreraService.eliminarCarrera(id), 'Carrera Eliminada');
  }
  
  private realizarOperacionDeCarrera(operacion: () => any, mensajeExitoso: string) {
    operacion().subscribe({
      next: (respuesta: any) => {
        console.log(`${mensajeExitoso} exitosamente`, respuesta);
        this.actualizarListaDeCarreras();
        this.toastr.warning(`La carrera fue ${mensajeExitoso.toLowerCase()} con éxito`, mensajeExitoso);
      },
      error: (error: any) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error(`Error al ${mensajeExitoso.toLowerCase()} la carrera`, error);
        }
      }
    });
  }
}
