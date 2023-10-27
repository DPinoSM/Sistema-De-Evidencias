import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CriterioService } from 'src/app/services/criterio.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-cri',
  templateUrl: './add-edit-cri.component.html',
  styleUrls: ['./add-edit-cri.component.css', '../../../shared-styles.css']
})
export class AddEditCriComponent implements OnInit {
  criterios: any[] = [];
  errorMsg: string | undefined;
  form: FormGroup;
  editCriterioId: number | null = null;
  sideNavStatus: boolean = false;

  constructor(
    private criterioService: CriterioService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      nombre_criterios: ['', [Validators.required]],
      codigo_criterios: [null, [Validators.required]],
      descripcion_criterios: ['', [Validators.required]],
      estado_criterios: [true, [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.editCriterioId = id;
        this.getCriterios(id); 
      }
    });
    this.actualizarListaDeCriterios();
  }

  guardarCriterio(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      const nombreCriterio = this.form.get('nombre_criterios')?.value;
      const codigoCriterio = this.form.get('codigo_criterios')?.value;
      const descripcionCriterio = this.form.get('descripcion_criterios')?.value;
      const estadoCriterio = this.form.get('estado_criterios')?.value;

      if (this.editCriterioId !== null) {
        this.editarCriterio(this.editCriterioId, nombreCriterio, codigoCriterio, descripcionCriterio, estadoCriterio);
      } else {
        this.criterioService.createCriterio({
          nombre_criterios: nombreCriterio,
          codigo_criterios: codigoCriterio,
          descripcion_criterios: descripcionCriterio,
          estado_criterios: estadoCriterio
        }).subscribe({
          next: (respuesta) => {
            console.log('Criterio creado exitosamente', respuesta);
            this.actualizarListaDeCriterios();
            this.toastr.success('El criterio fue creado con éxito', 'Criterio Creado');
          },
          error: (error) => {
            if (error && error.msg) {
              this.errorMsg = error.msg;
              console.error('Error al crear el criterio', error);
            }
          }
        });
      }
    }
  }

  getCriterios(id: number | null) {
    if (id !== null) {
      this.criterioService.getCriterioById(id).subscribe((criterio) => {
        if (criterio && this.form) {
          this.form.get('nombre_criterios')?.setValue(criterio.nombre_criterios);
          this.form.get('codigo_criterios')?.setValue(criterio.codigo_criterios);
          this.form.get('descripcion_criterios')?.setValue(criterio.descripcion_criterios);
          this.form.get('estado_criterios')?.setValue(criterio.estado_criterios);
        }
      });
    } else {
      this.criterioService.getCriterios().subscribe((data) => {
        this.criterios = data;
        this.form.reset();
      });
    }
  }
  

  actualizarListaDeCriterios() {
    this.criterioService.getCriterios().subscribe((data) => {
      this.criterios = data;
      this.form.reset();
    });
  }

  editarCriterio(id: number, nombreCriterio: string, codigoCriterio: number, descripcionCriterio: string, estadoCriterio: boolean) {
    if (this.form) {
      this.criterioService.updateCriterio(id, {
        nombre_criterios: nombreCriterio,
        codigo_criterios: codigoCriterio,
        descripcion_criterios: descripcionCriterio,
        estado_criterios: estadoCriterio
      }).subscribe({
        next: (respuesta) => {
          console.log('Criterio actualizado exitosamente', respuesta);
          this.actualizarListaDeCriterios();
          this.toastr.success('El criterio fue editado correctamente', 'Criterio Editado');
        },
        error: (error) => {
          if (error && error.msg) {
            this.errorMsg = error.msg;
            console.error('Error al actualizar el criterio', error);
          }
        }
      });
    }
  }
  
}
