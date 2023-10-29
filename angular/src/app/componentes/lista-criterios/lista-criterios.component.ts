import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CriterioService } from 'src/app/services/criterio.service';
import { Criterio } from '../../interfaces/criterio.interface';

@Component({
  selector: 'app-lista-criterios',
  templateUrl: './lista-criterios.component.html',
  styleUrls: ['./lista-criterios.component.css', '../../../shared-styles.css']
})
export class ListaCriteriosComponent implements OnInit {
  criterios: Criterio[] = [];
  errorMsg: string | undefined;
  form: FormGroup;
  criteriosEditId: number | null = null;
  mostrarFormularioAgregarCriterios: boolean = false;
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
        this.criteriosEditId = id;
        this.mostrarAgregarEditarCriterios(id);
      }
    });
    this.actualizarListaDeCriterios();
  }

  mostrarAgregarEditarCriterios(id: number | null) {
    this.criteriosEditId = id;
    this.mostrarFormularioAgregarCriterios = true;
  
    if (id !== null) {
      this.getCriterio(id);
    } else {
      this.form.reset(); 
    }
  }
  

  cancelarEdicion() {
    this.criteriosEditId = null;
    this.mostrarFormularioAgregarCriterios = false;
    this.form.reset();
  }

  guardarCriterio(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const { nombre_criterios, codigo_criterios, descripcion_criterios, estado_criterios } = this.form.value;
      if (this.criteriosEditId !== null) {
        this.editarCriterios(this.criteriosEditId, nombre_criterios, codigo_criterios, descripcion_criterios);
      } else {
        this.crearCriterios(nombre_criterios, codigo_criterios, descripcion_criterios, estado_criterios);
      }
      this.mostrarFormularioAgregarCriterios = false;
    }
  }

  getCriterio(id: number | null) {
    if (id !== null) {
      this.criterioService.getCriterioById(id).subscribe((criterio) => {
        if (criterio && this.form) {
          this.form.setValue({
            nombre_criterios: criterio.nombre_criterios,
            codigo_criterios: criterio.codigo_criterios,
            descripcion_criterios: criterio.descripcion_criterios,
            estado_criterios: criterio.estado_criterios
          });
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

  editarCriterios(id: number, nombre_criterios: string, codigo_criterios: number, descripcion_criterios: string) {
    if (this.form) {
      this.criterioService.updateCriterio(id, { nombre_criterios, codigo_criterios, descripcion_criterios })
        .subscribe({
          next: () => this.handleSuccess('Criterios Editado'),
          error: (error) => this.handleError(error)
        });
    }
  }

  crearCriterios(nombre_criterios: string, codigo_criterios: number, descripcion_criterios: string, estado_criterios: boolean) {
    this.criterioService.createCriterio({ nombre_criterios, codigo_criterios, descripcion_criterios, estado_criterios })
      .subscribe({
        next: () => this.handleSuccess('Criterios Creado'),
        error: (error) => this.handleError(error)
      });
  }

  eliminarCriterios(id: number) {
    if (id) {
      this.criterioService.deleteCriterio(id).subscribe({
        next: () => this.handleSuccess('Criterios Eliminado'),
        error: (error) => this.handleError(error)
      });
    } else {
      console.error('ID de criterios no válido');
    }
  }

  cambiarEstadoCriterios(id: number) {
    const criterios = this.criterios.find((c) => c.id_criterios === id);
    if (criterios) {
      const nuevoEstado = !criterios.estado_criterios;
      this.criterioService.updateCriterio(id, { estado_criterios: nuevoEstado })
        .subscribe({
          next: () => this.handleSuccess('Estado del Criterios Actualizado'),
          error: (error) => this.handleError(error)
        });
    }
  }

  private handleSuccess(message: string) {
    this.actualizarListaDeCriterios();
    this.toastr.success(`El ${message.toLowerCase()} correctamente`, message);
  }

  private handleError(error: any) {
    if (error && error.msg) {
      this.errorMsg = error.msg;
      console.error('Error:', error);
    }
  }
}