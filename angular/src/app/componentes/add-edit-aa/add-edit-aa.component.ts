import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AmbitoAService } from 'src/app/services/ambito-a.service';

@Component({
  selector: 'app-add-edit-aa',
  templateUrl: './add-edit-aa.component.html',
  styleUrls: ['./add-edit-aa.component.css', '../../../shared-styles.css']
})
export class AddEditAaComponent implements OnInit {
  ambitosAcademicos: any[] = [];
  errorMsg: string | undefined;
  form: FormGroup;
  editAmbitoAId: number | null = null;
  sideNavStatus: boolean = false;

  constructor(
    private ambitoAService: AmbitoAService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      nombre_ambito_academico: ['', [Validators.required]],
      estado_ambito_academico: [true, [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.editAmbitoAId = id;
        this.getAmbitoAcademico(id);
      }
    });
    this.actualizarListaDeAmbitosAcademicos();
  }

  guardarAmbitoA(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      const nombreAmbitoAcademico = this.form.get('nombre_ambito_academico')?.value;
      const estadoAmbitoAcademico = this.form.get('estado_ambito_academico')?.value;

      if (this.editAmbitoAId !== null) {
        this.editarAmbitoAcademico(this.editAmbitoAId, nombreAmbitoAcademico, estadoAmbitoAcademico);
      } else {
        this.ambitoAService.newAmbitoAcademico({
          nombre_ambito_academico: nombreAmbitoAcademico,
          estado_ambito_academico: estadoAmbitoAcademico
        }).subscribe({
          next: (respuesta) => {
            console.log('Ámbito académico creado exitosamente', respuesta);
            this.actualizarListaDeAmbitosAcademicos();
            this.toastr.success('El ámbito académico fue creado con éxito', 'Ámbito Académico Creado');
          },
          error: (error) => {
            if (error && error.msg) {
              this.errorMsg = error.msg;
              console.error('Error al crear el ámbito académico', error);
            }
          }
        });
      }
    }
  }

  getAmbitoAcademico(id: number) {
    this.ambitoAService.getAmbitoAcademico(id).subscribe((ambito) => {
      if (ambito && this.form) {
        this.form.get('nombre_ambito_academico')?.setValue(ambito.nombre_ambito_academico);
        this.form.get('estado_ambito_academico')?.setValue(ambito.estado_ambito_academico);
      }
    });
  }

  actualizarListaDeAmbitosAcademicos() {
    this.ambitoAService.getAmbitosAcademicos().subscribe((ambitoData) => {
      this.ambitosAcademicos = ambitoData;
      this.form.get('nombre_ambito_academico')?.setValue('');
    });
  }

  editarAmbitoAcademico(id: number, nombreAmbitoAcademico: string, estadoAmbitoAcademico: boolean) {
    if (this.form) {
      this.ambitoAService.updateAmbitoAcademico(id, {
        nombre_ambito_academico: nombreAmbitoAcademico,
        estado_ambito_academico: estadoAmbitoAcademico
      }).subscribe({
        next: (respuesta) => {
          console.log('Ámbito académico actualizado exitosamente', respuesta);
          this.actualizarListaDeAmbitosAcademicos();
          this.toastr.success('El ámbito académico fue editado correctamente', 'Ámbito Académico Editado');
        },
        error: (error) => {
          if (error && error.msg) {
            this.errorMsg = error.msg;
            console.error('Error al actualizar el ámbito académico', error);
          }
        }
      });
    }
  }
}
