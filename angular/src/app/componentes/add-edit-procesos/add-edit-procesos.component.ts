import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proceso } from 'src/app/interfaces/procesos';
import { ProcesosService } from 'src/app/services/procesos.service';

@Component({
  selector: 'app-add-edit-procesos',
  templateUrl: './add-edit-procesos.component.html',
  styleUrls: ['./add-edit-procesos.component.css']
})
export class AddEditProcesosComponent implements OnInit {

  procesos: any[] = [];
  errorMsg: string | undefined;
  //form: FormGroup; 
  form: FormGroup;
  //operacion: string = 'Agregar ';
  //id: number;
  editProcesoId: number | null = null;

  
  constructor(private fb: FormBuilder,
    private _procesoService: ProcesosService,
    private route: ActivatedRoute,
    private toastr: ToastrService){
    this.form = this.fb.group({
      codigo_procesos: ['', [Validators.required]],
      nombre_procesos: ['', [Validators.required]],
      estado_procesos: ['', [Validators.required]],
    })
    //this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)){
        this.editProcesoId = id;
        this.getProcesos(id); 
      }
    });
    this.actualizarListaDeProcesos();
  }

  addProceso(event: Event) {
    /*console.log(this.form.get('id_procesos')?.value);*/
    
    event.preventDefault();  

    if (this.form.valid){
      const data: Proceso = {
        //id_procesos: this.form.value.id_procesos,
        codigo_procesos: this.form.value.codigo_procesos,
        nombre_procesos: this.form.value.nombre_procesos,
        estado_procesos: this.form.value.estado_procesos
      }

      const codigoProcesos = this.form.get('codigo_procesos')?.value;
      const nombreProcesos = this.form.get('nombre_procesos')?.value;
      const estadoProcesos = this.form.get('estado_procesos')?.value;

      if (this.editProcesoId !== null){
        this.updateProceso(this.editProcesoId, data.codigo_procesos, data.nombre_procesos, data.estado_procesos);
      }else{
        /*console.log(this.form.get('codigo_procesos')?.value);
        console.log(this.form.get('nombre_procesos')?.value);
        console.log(this.form.get('estado_procesos')?.value);
        console.log('Entro aqui?---');*/
        this._procesoService.createProceso({
          codigo_procesos: codigoProcesos,
          nombre_procesos: nombreProcesos,
          estado_procesos: estadoProcesos
        }).subscribe({
          next: (respuesta) => {
            console.log('PASO---');
            console.log('Proceso creado exitosamente', respuesta);
            this.actualizarListaDeProcesos();
            this.toastr.success('El Proceso fue creado con éxito', 'Proceso Creado');
          },
          error: (error) => {
            if (error && error.msg) {
              this.errorMsg = error.msg;
            }
          }
        });
        
      }
      /*this._procesoService.createProceso(proceso).subscribe(() => {
        this.toastr.success(`El proceso ${proceso.nombre_procesos} fue registrado con exito`, 'Proceso registrado');
        this.router.navigate(['']);
      })*/
    }
  }
  
  getProcesos(id: number | null) {
    if(id !== null){
      this._procesoService.getProceso(id).subscribe((Proceso) => {
        if (Proceso && this.form) {
          this.form.get('id_procesos')?.setValue(Proceso.id_procesos);
          this.form.get('codigo_procesos')?.setValue(Proceso.codigo_procesos);
          this.form.get('nombre_procesos')?.setValue(Proceso.nombre_procesos);
          this.form.get('estado_procesos')?.setValue(Proceso.estado_procesos);
        }
      });
    } else {
      this._procesoService.getListProcesos().subscribe((data) => {
        this.procesos= data;
        this.form.reset();
      });
    }
  }

  actualizarListaDeProcesos() {
    this._procesoService.getListProcesos().subscribe((data) => {
      this.procesos = data;
      this.form.reset();
    });
  }

  updateProceso(id: number, codigoProceso: string, nombreProceso: string, estadoProceso: boolean){
    if (this.form) {
      this._procesoService.updateProceso(id, {
        codigo_procesos: codigoProceso,
        nombre_procesos: nombreProceso,
        estado_procesos: estadoProceso
      }).subscribe({
        next: (respuesta) => {
          this.actualizarListaDeProcesos();
          this.toastr.success('El proceso fue editado correctamente', 'Proceso Editado');
        },
        error: (error) => {
          if (error && error.msg) {
            this.errorMsg = error.msg;
          }
        }
      });
    }

    /*const proceso: Proceso = {
      id_procesos: this.form.value.id,
      codigo_procesos: this.form.value.codigo_procesos,
      nombre_procesos: this.form.value.nombre_procesos,
      estado_procesos: this.form.value.estado_procesos
    }

    proceso.id_procesos = this.id;
    this._procesoService.updateProceso(this.id, proceso).subscribe(() => {
      this.toastr.info(`El proceso ${proceso.nombre_procesos} fue actualizado con exito`, 'Proceso actualizado');
      //this.loading = false;
      this.router.navigate(['']);
      console.log('entra aca');
    })*/
  }
  
}

/*<div class="card-body">
        <form [formGroup]="form" (ngSubmit)="addProceso($event)">
          <input
            formControlName="codigo_procesos"
            types="number"
            class="form-control mt-2"
            placeholder="Ingrese Codigo"
          />
          <span
            *ngIf="
              form.get('codigo_procesos')?.hasError('required') &&
              form.get('codigo_procesos')?.touched
            "
          >
            El campo Codigo es <strong>Requerido</strong>
          </span>
          <input
            formControlName="nombre_procesos"
            types="text"
            class="form-control mt-2"
            placeholder="Ingrese Nombre"
          />
          <span
            *ngIf="
              form.get('nombre_procesos')?.hasError('required') &&
              form.get('nombre_procesos')?.touched
            "
          >
            El campo Nombre es <strong>Requerido</strong>
          </span>
          <input
            formControlName="estado_procesos"
            types="text"
            class="form-control mt-2"
            placeholder="Ingrese Estado"
          />
          <span
            *ngIf="
              form.get('estado_procesos')?.hasError('required') &&
              form.get('estado_procesos')?.touched
            "
          >
            El campo Estado es <strong>Requerido</strong>
          </span>
          <div class="row">
            <div class="col-lg-6">
              <div class="col-lg-6">
                <button
                  routerLink="/procesos"
                  type="button"
                  class="btn btn-secondary mt-2"
                >
                  Volver
                </button>
              </div>
              <div class="col-lg-6">
                <button
                  [disabled]="form.invalid"
                  routerLink="procesos"
                  type="submit"
                  class="btn btn-danger mt-2"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>*/