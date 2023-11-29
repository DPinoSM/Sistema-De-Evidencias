import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Registro } from 'src/app/interfaces/registro.interface';

@Component({
  selector: 'app-list-registros',
  templateUrl: './lista-registros.component.html',
  styleUrls: ['./lista-registros.component.css', '../../../shared-styles.css']
})

export class ListaRegistrosComponent implements OnInit {
  registros: Registro[] = [];
  registrosOriginal: Registro[] | null = null;
  sideNavStatus: boolean = false;
  mostrarFormularioAgregarRegistro: boolean = false;
  editRegistroId: number | null = null;
  errorMsg: string | undefined;
  form: FormGroup;
  private registrosSubscription!: Subscription;
  currentPage: number = 1;
  searchTerm: string = '';


  constructor(private registroService: RegistroService, private toastr: ToastrService) {
    this.form = new FormGroup({
      datos_registro: new FormControl('', [Validators.required]),
      contenido_registro: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.actualizarListaDeRegistros();
  }

  mostrarFormularioAgregarEditarRegistro(id: number | null) {
    if (id !== null) {
      this.editRegistroId = id;
      this.getRegistroById(id);
    } else {
      this.editRegistroId = null;
      this.form.reset();
    }

    this.mostrarFormularioAgregarRegistro = true;
  }

  cancelarEdicionRegistro() {
    this.mostrarFormularioAgregarRegistro = false;
    this.editRegistroId = null;
    this.form.reset();
  }


  nombreRegistroExistente(datos_registro: string): boolean {
    return this.registros.some(registro => registro.datos_registro === datos_registro);
  }
  
  createNewRegistro() {
    if (this.form.valid) {
      const datos_registro = this.form.get('datos_registro')?.value;
    
      if (this.editRegistroId) {
        const registroEditado: any = {
          id_registro: this.editRegistroId,
        };
        if (this.form.get('datos_registro')?.dirty) {
          registroEditado['datos_registro'] = datos_registro;
        }
        registroEditado['contenido_registro'] = this.form.get('contenido_registro')?.value;
        
        this.editRegistro(this.editRegistroId, registroEditado);
      } else {
        const contenido_registro = this.form.get('contenido_registros')?.value;
        if (this.nombreRegistroExistente(datos_registro)) {
          this.toastr.error('El nombre de ese registro ya esta en uso', 'Error');
        } else {
          this.realizarOperacionDeRegistro(() =>
            this.registroService.createRegistro({ 
              datos_registro: datos_registro, 
              contenido_registro: contenido_registro 
            }), 
            'Registro Creado');
        }
      }
    }
    this.mostrarFormularioAgregarRegistro = false;
    this.cancelarEdicionRegistro()
  }
  
  

  getRegistroById(id: number) {
    this.registroService.getRegistroById(id).subscribe((registro) => {
      if (registro) {
        this.form.get('datos_registro')?.setValue(registro.datos_registro);
        this.form.get('contenido_registro')?.setValue(registro.contenido_registro);    
      }
    });
  }

  realizarBusquedaRegistro() {
    if (this.searchTerm) {
      this.currentPage = 1;
      this.actualizarListaDeRegistros(); 
    } else {

      if (this.registrosOriginal) {
        this.registros = this.registrosOriginal;
      }
    }
  }

  pageChanged(page: number) {
    this.currentPage = page;
  }


  actualizarListaDeRegistros() {
    if (this.registrosSubscription) {
      this.registrosSubscription.unsubscribe();
    }
    this.registrosSubscription = this.registroService.getRegistros()
      .pipe(
        catchError(error => {
          console.error('Error al obtener registros:', error);
          return [];
        })
      )
      .subscribe((data: Registro[]) => {
        if(!this.registrosOriginal){
          this.registrosOriginal = data;
        }
        this.registros = data.filter(registro => {
          return (
            this.comienzaConCadena(registro.id_registro.toString(), this.searchTerm) ||
            this.comienzaConCadena(registro.datos_registro, this.searchTerm)
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
  

  editRegistro(id: number, registroEditado: any) {
    this.realizarOperacionDeRegistro(() =>
      this.registroService.updateRegistro(id, registroEditado), 'Registro Editado');
  }

  eliminarRegistro(id: number) {
    this.realizarOperacionDeRegistro(() => 
    this.registroService.deleteRegistro(id), 'Registro Eliminado');
  }

  private realizarOperacionDeRegistro(operacion: () => any, mensajeExitoso: string) {
    operacion().subscribe({
      next: (respuesta: any) => {
        console.log(`${mensajeExitoso} exitosamente`, respuesta);
        this.actualizarListaDeRegistros();
        this.toastr.warning(`El registro fue ${mensajeExitoso.toLowerCase()} con éxito`, mensajeExitoso);
      },
      error: (error: any) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error(`Error al ${mensajeExitoso.toLowerCase()} el registro`, error);
        }
      }
    });
  }
}
