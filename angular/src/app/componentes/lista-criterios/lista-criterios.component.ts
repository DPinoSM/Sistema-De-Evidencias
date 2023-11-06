import { Component, OnInit } from '@angular/core';
import { CriterioService } from 'src/app/services/criterio.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Criterio } from 'src/app/interfaces/criterio.interface';

@Component({
  selector: 'app-lista-criterios',
  templateUrl: './lista-criterios.component.html',
  styleUrls: ['./lista-criterios.component.css', '../../../shared-styles.css']
})

export class ListaCriteriosComponent implements OnInit {
  criterios: Criterio[] = [];
  criteriosOriginal: Criterio[] | null = null;
  errorMsg: string | undefined;
  form: FormGroup;
  criterioEditId: number | null = null;
  sideNavStatus: boolean = false;
  mostrarFormularioAgregarCriterios: boolean = false;
  private criterioSubscription!: Subscription;
  currentPage: number = 1;
  searchTerm: string = '';


  constructor(
    private criterioService: CriterioService, 
    private toastr: ToastrService
  ) {
    this.form = new FormGroup({
      nombre_criterios: new FormControl('', [Validators.required]),
      codigo_criterios: new FormControl(null, [Validators.required]),
      descripcion_criterios: new FormControl('', [Validators.required]),
      estado_criterios: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.actualizarListaDeCriterios();
  }

  mostrarAgregarEditarCriterios(id: number | null) {
    if (id !== null) {
      this.criterioEditId = id;
      this.obtenerCriterio(id);
    } else {
      this.criterioEditId = null;
      this.form.reset();
    }
    this.mostrarFormularioAgregarCriterios = true;
  }

  cancelarEdicion() {
    this.mostrarFormularioAgregarCriterios = false;
    this.criterioEditId = null;
    this.form.reset();
  }

  crearEditarCriterio() {
    if (this.form.valid) {
      const nombre_criterios = this.form.get('nombre_criterios')?.value;
      const codigo_criterios = this.form.get('codigo_criterios')?.value;
      const descripcion_criterios = this.form.get('descripcion_criterios')?.value;
      const estado_criterios = this.form.get('estado_criterios')?.value;
  
      if (this.codigoCriterioExistente(codigo_criterios)) {
          this.toastr.error('Codigo de criterio ya utilizado', 'Error');
        } else if (this.criterioEditId) {
        this.editarCriterio(this.criterioEditId, nombre_criterios, codigo_criterios, descripcion_criterios, estado_criterios);
      } else {
        
          this.errorMsg = undefined;
          this.realizarOperacionDeCriterio(() =>
            this.criterioService.createCriterio({ nombre_criterios: nombre_criterios, codigo_criterios: codigo_criterios, descripcion_criterios: descripcion_criterios, estado_criterios: estado_criterios }), 'Criterio Creado');
        
      }
    }
  
    this.mostrarFormularioAgregarCriterios = false;
    this.cancelarEdicion()
    this.cancelarEdicion()
  }
  
  codigoCriterioExistente(codigo_criterios: number): boolean {
    return this.criterios.some(criterio => criterio.codigo_criterios === codigo_criterios);
  }
  

  obtenerCriterio(id: number) {
    this.criterioService.getCriterioById(id).subscribe(criterio => {
      if (criterio) {
        this.form.get('nombre_criterios')?.setValue(criterio.nombre_criterios);
        this.form.get('codigo_criterios')?.setValue(criterio.codigo_criterios);
        this.form.get('descripcion_criterios')?.setValue(criterio.descripcion_criterios);
        this.form.get('estado_criterios')?.setValue(criterio.estado_criterios);
      }
    });
  }

  realizarBusquedaCriterios() {
    if (this.searchTerm) {
      this.currentPage = 1;
      this.  actualizarListaDeCriterios(); 
    } else {

      if (this.criteriosOriginal) {
        this.criterios = this.criteriosOriginal;
      }
    }
  }

  pageChanged(page: number) {
    this.currentPage = page;
  }

  actualizarListaDeCriterios() {
    if (this.criterioSubscription) {
      this.criterioSubscription.unsubscribe();
    }

    this.criterioSubscription = this.criterioService.getCriterios()
      .pipe(
        catchError(error => {
          console.error('Error al obtener criterios:', error);
          return [];
        })
      )
      .subscribe((data: Criterio[]) => {
        if(!this.criteriosOriginal){
          this.criteriosOriginal = data;
        }
        this.criterios = data.filter(Criterio => {
          return (
            this.comienzaConCadena(Criterio.id_criterios.toString(), this.searchTerm) ||
            this.comienzaConCadena(Criterio.nombre_criterios, this.searchTerm)
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
  
  editarCriterio(id: number, nombre_criterios: string, codigo_criterios: number, descripcion_criterios: string, estado_criterios: any) {
    this.realizarOperacionDeCriterio(() =>
      this.criterioService.updateCriterio(id, { nombre_criterios: nombre_criterios, codigo_criterios: codigo_criterios, descripcion_criterios: descripcion_criterios, estado_criterios: estado_criterios }), 'Criterio Editado');
  }

  cambiarEstadoCriterio(id: number) {
    const criterio = this.criterios.find(c => c.id_criterios === id);

    if (criterio) {
      const nuevoEstado = !criterio.estado_criterios;

      this.realizarOperacionDeCriterio(() => this.criterioService.updateCriterio(id, { estado_criterios: nuevoEstado }), 'Estado Cambiado');
    }
  }

  eliminarCriterio(id: number) {
    this.realizarOperacionDeCriterio(() => this.criterioService.deleteCriterio(id), 'Criterio Eliminado');
  }

  private realizarOperacionDeCriterio(operacion: () => any, mensajeExitoso: string) {
    operacion().subscribe({
      next: (respuesta: any) => {
        console.log(`${mensajeExitoso} exitosamente`, respuesta);
        this.actualizarListaDeCriterios();
        this.toastr.warning(`El criterio fue ${mensajeExitoso.toLowerCase()} con éxito`, mensajeExitoso);
      },
      error: (error: any) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error(`Error al ${mensajeExitoso.toLowerCase()} el criterio`, error);
        }
      }
    });
  }
}
