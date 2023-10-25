import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-reg',
  templateUrl: './add-edit-reg.component.html',
  styleUrls: ['./add-edit-reg.component.css']
})
export class AddEditRegComponent implements OnInit {
  registros: any[] = [];
  datosRegistro: string = '';
  contenidoRegistro: string = '';
  errorMsg: string | undefined;
  form: FormGroup;
  editRegistroId: number | null = null;
  registroSeleccionado: any = {};

  constructor(private registroService: RegistroService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.form = new FormGroup({
      datos: new FormControl('', [Validators.required]),
      contenido: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.editRegistroId = id;
        this.getRegistroById(id);
      }
    });
    this.updateRegistroList();
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
        this.registroSeleccionado = registro; 
      }
    });
  }

  updateRegistroList() {
    this.registroService.getRegistros().subscribe((data: any) => {
      this.registros = data;
    });
  }

  editRegistro(id: number, datos: string, contenido: string) {
    this.registroService.updateRegistro(id, { datos_registro: datos, contenido_registro: contenido }).subscribe({
      next: (respuesta) => {
        console.log('Registro actualizado exitosamente', respuesta);
        this.updateRegistroList();
        this.toastr.warning('El registro fue editado correctamente', 'Registro Editado');
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
