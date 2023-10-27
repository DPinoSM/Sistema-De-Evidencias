import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnidadService } from 'src/app/services/unidad.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-unid',
  templateUrl: './add-edit-unid.component.html',
  styleUrls: ['./add-edit-unid.component.css', '../../../shared-styles.css']
})
export class AddEditUnidComponent implements OnInit {
  unidades: any[] = [];
  errorMsg: string | undefined;
  form: FormGroup;
  editUnidadId: number | null = null;
  sideNavStatus: boolean = false;

  constructor(
    private unidadService: UnidadService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      nombre_unidad: ['', [Validators.required]],
      unidad_defecto: [true, [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.editUnidadId = id;
        this.getUnidad(id);
      }
    });
    this.actualizarListaDeUnidades();
  }

  guardarUnidad(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      const nombreUnidad = this.form.get('nombre_unidad')?.value;
      const unidadDefecto = this.form.get('unidad_defecto')?.value;

      if (this.editUnidadId !== null) {
        this.editarUnidad(this.editUnidadId, nombreUnidad, unidadDefecto);
      } else {
        this.unidadService.createUnidad({
          nombre_unidad: nombreUnidad,
          unidad_defecto: unidadDefecto
        }).subscribe({
          next: (respuesta) => {
            console.log('Unidad creada exitosamente', respuesta);
            this.actualizarListaDeUnidades();
            console.log('Valor de unidad_defecto:', unidadDefecto);
            this.toastr.success('La unidad fue creada con éxito', 'Unidad Creada');
          },
          error: (error) => {
            if (error && error.msg) {
              this.errorMsg = error.msg;
              console.error('Error al crear la unidad', error);
            }
          }
        });
      }
    }
  }

  getUnidad(id: number) {
    this.unidadService.getUnidad(id).subscribe((unidad) => {
      if (unidad && this.form) {
        this.form.get('nombre_unidad')?.setValue(unidad.nombre_unidad);
        this.form.get('unidad_defecto')?.setValue(unidad.unidad_defecto);
      }
    });
  }

  actualizarListaDeUnidades() {
    this.unidadService.getUnidades().subscribe((data) => {
      this.unidades = data;
      this.form.get('nombre_unidad')?.setValue('');
    });
  }

  editarUnidad(id: number, nombreUnidad: string, unidadDefecto: boolean) {
    if (this.form) {
      this.unidadService.updateUnidad(id, {
        nombre_unidad: nombreUnidad,
        unidad_defecto: unidadDefecto
      }).subscribe({
        next: (respuesta) => {
          console.log('Unidad actualizada exitosamente', respuesta);
          console.log('Valor de unidad_defecto:', unidadDefecto);
          this.actualizarListaDeUnidades();
          this.toastr.success('La unidad fue editada correctamente', 'Unidad Editada');
        },
        error: (error) => {
          if (error && error.msg) {
            this.errorMsg = error.msg;
            console.error('Error al actualizar la unidad', error);
          }
        }
      });
    }
  }
}
