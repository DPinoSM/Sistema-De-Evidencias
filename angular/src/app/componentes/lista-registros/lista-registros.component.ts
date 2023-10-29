import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-registros',
  templateUrl: './lista-registros.component.html',
  styleUrls: ['./lista-registros.component.css', '../../../shared-styles.css']
})
export class ListaRegistrosComponent implements OnInit {
  registros: any[] = [];
  newRegistroData: any;
  private registrosSubscription!: Subscription;
  sideNavStatus: boolean = false;
  mostrarFormularioAgregarRegistro: boolean = false;
  editRegistroId: number | null = null;
  errorMsg: string | undefined;
  form: FormGroup;

  constructor(private registroService: RegistroService, private toastr: ToastrService, private route: ActivatedRoute) {
    this.newRegistroData = {
      id_registro: '',
      datos_registro: '',
      contenido_registro: ''
    };
    this.form = new FormGroup({
      datos: new FormControl('', [Validators.required]),
      contenido: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getRegistros();
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.editRegistroId = id;
        this.mostrarFormularioAgregarEditarRegistro(id);
        this.getRegistroById(id);
      }
    });
  }

  getRegistros() {
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
      .subscribe((data: any) => {
        this.registros = data;
      });
  }

  mostrarFormularioAgregarEditarRegistro(id: number | null) {
    this.mostrarFormularioAgregarRegistro = true;
    this.editRegistroId = id;
  }

  cancelarEdicionRegistro() {
    this.mostrarFormularioAgregarRegistro = false;
    this.editRegistroId = null;
    this.errorMsg = undefined;
    this.form.reset();
  }

  eliminarRegistro(id: number) {
    this.registroService.deleteRegistro(id).subscribe(() => {
      this.getRegistros();
      this.toastr.warning('El registro fue eliminado con éxito', 'Registro eliminado');
    });
  }

  createNewRegistro() {
    if (this.form.valid) {
      const datosRegistro = this.form.get('datos')?.value;
      const contenidoRegistro = this.form.get('contenido')?.value;

      if (this.editRegistroId) {
        this.editRegistro(this.editRegistroId, datosRegistro, contenidoRegistro);
      } else {
        this.registroService.createRegistro({ datos_registro: datosRegistro, contenido_registro: contenidoRegistro }).subscribe({
          next: (respuesta) => {
            console.log('Registro creado exitosamente', respuesta);
            this.updateRegistroList();
            this.toastr.warning('El registro fue creado con éxito', 'Registro Creado');
            this.cancelarEdicionRegistro();
          },
          error: (error) => {
            if (error && error.msg) {
              this.errorMsg = error.msg;
              console.error('Error al crear el registro', error);
            }
          }
        });
      }
    }
  }

  getRegistroById(id: number) {
    this.registroService.getRegistroById(id).subscribe(registro => {
      if (registro) {
        this.mostrarFormularioAgregarEditarRegistro(id);
        this.form.setValue({
          datos: registro.datos_registro,
          contenido: registro.contenido_registro
        });
      }
    });
  }

  updateRegistroList() {
    this.getRegistros();
  }

  editRegistro(id: number, datos: string, contenido: string) {
    this.registroService.updateRegistro(id, { datos_registro: datos, contenido_registro: contenido }).subscribe({
      next: (respuesta) => {
        console.log('Registro actualizado exitosamente', respuesta);
        this.updateRegistroList();
        this.toastr.warning('El registro fue editado correctamente', 'Registro Editado');
        this.cancelarEdicionRegistro();
      },
      error: (error) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error('Error al actualizar el registro', error);
        }
      }
    });
  }
}
