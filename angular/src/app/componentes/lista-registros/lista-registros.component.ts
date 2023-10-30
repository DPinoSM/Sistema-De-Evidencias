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
  sideNavStatus: boolean = false;
  mostrarFormularioAgregarRegistro: boolean = false;
  editRegistroId: number | null = null;
  errorMsg: string | undefined;
  form: FormGroup;
  private registrosSubscription!: Subscription;

  constructor(private registroService: RegistroService, private toastr: ToastrService) {
    this.form = new FormGroup({
      datos: new FormControl('', [Validators.required]),
      contenido: new FormControl('', [Validators.required])
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


  createNewRegistro() {
    if (this.form.valid) {
      const datosRegistro = this.form.get('datos')?.value;
      const contenidoRegistro = this.form.get('contenido')?.value;

      if (this.editRegistroId) {
        this.editRegistro(this.editRegistroId, datosRegistro, contenidoRegistro);
      } else {
        this.realizarOperacionDeRegistro(() =>
          this.registroService.createRegistro({ datos_registro: datosRegistro, contenido_registro: contenidoRegistro }), 'Registro Creado');
      }
    }

    this.mostrarFormularioAgregarRegistro = false;
  }

  getRegistroById(id: number) {
    this.registroService.getRegistroById(id).subscribe((registro) => {
      if (registro) {
        this.form.get('datos')?.setValue(registro.datos_registro);
        this.form.get('contenido')?.setValue(registro.contenido_registro);    
      }
    });
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
        this.registros = data;
      });
  }

  editRegistro(id: number, datos: string, contenido: string) {
    this.realizarOperacionDeRegistro(() =>
      this.registroService.updateRegistro(id, { datos_registro: datos, contenido_registro: contenido }), 'Registro Editado');
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
