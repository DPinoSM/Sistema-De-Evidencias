import { Component, OnInit } from '@angular/core';
import { ProcesosService } from 'src/app/services/proceso.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Proceso } from 'src/app/interfaces/proceso.interface';

@Component({
  selector: 'app-lista-procesos',
  templateUrl: './lista-procesos.component.html',
  styleUrls: ['./lista-procesos.component.css', '../../../shared-styles.css']
})
export class ListaProcesosComponent implements OnInit{
  proceso: Proceso[] = [];
  errorMsg: string | undefined;
  form: FormGroup;
  procesoEditId: number | null = null;
  sideNavStatus: boolean = false;
  mostrarFormularioAgregarProcesos: boolean = false;
  private procesoSubscription!: Subscription;

  constructor(
    private procesoService: ProcesosService, 
    private toastr: ToastrService
  ) {
    this.form = new FormGroup({
      //id_procesos: new FormControl(null, [Validators.required]),
      codigo_procesos: new FormControl('', [Validators.required]),
      nombre_procesos: new FormControl('', [Validators.required]),
      estado_procesos: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.actualizarListaDeProcesos();
  }

  mostrarAgregarEditarProcesos(id: number | null) {
    if (id !== null) {
      this.procesoEditId = id;
      this.obtenerProceso(id);
    } else {
      this.procesoEditId = null;
      this.form.reset();
    }
    this.mostrarFormularioAgregarProcesos = true;
    console.log(this.mostrarFormularioAgregarProcesos)
  }

  cancelarEdicion() {
    this.mostrarFormularioAgregarProcesos = false;
    this.procesoEditId = null;
    this.form.reset();
  }

  crearEditarProceso() {
    console.log(this.mostrarFormularioAgregarProcesos);
    if (this.mostrarFormularioAgregarProcesos == true) {
      const codigo_procesos = this.form.get('codigo_procesos')?.value;
      const nombre_procesos = this.form.get('nombre_procesos')?.value;
      const estado_procesos = this.form.get('estado_procesos')?.value;
      console.log('entraaaaaaaa')
      if (this.procesoEditId) {
        console.log(codigo_procesos,nombre_procesos);
        this.editarProceso(this.procesoEditId, codigo_procesos, nombre_procesos, estado_procesos);
      } else {
        this.realizarOperacionDeProceso(() =>
          this.procesoService.createProceso({ codigo_procesos: codigo_procesos, nombre_procesos: nombre_procesos, estado_procesos: estado_procesos }), 'Proceso Creado');
      }
    }
    this.mostrarFormularioAgregarProcesos = false;
  }

  obtenerProceso(id: number) {
    this.procesoService.getProcesoById(id).subscribe(proceso => {
      if (proceso) {
        this.form.get('codigo_procesos')?.setValue(proceso.codigo_procesos);
        this.form.get('nombre_procesos')?.setValue(proceso.nombre_procesos);
        this.form.get('estado_procesos')?.setValue(proceso.estado_procesos);
      }
    });
  }

  actualizarListaDeProcesos() {
    if (this.procesoSubscription) {
      this.procesoSubscription.unsubscribe();
    }

    this.procesoSubscription = this.procesoService.getProcesos()
      .pipe(
        catchError(error => {
          console.error('Error al obtener procesos:', error);
          return [];
        })
      )
      .subscribe((data: Proceso[]) => {
        //console.log(data);
        this.proceso = data;
      });
  }

  editarProceso(id: number, codigo_procesos: string, nombre_procesos: string, estado_procesos: any) {
    this.realizarOperacionDeProceso(() =>
      this.procesoService.updateProceso(id, { codigo_procesos: codigo_procesos, nombre_procesos: nombre_procesos, estado_procesos: estado_procesos }), 'Proceso Editado');
  }

  cambiarEstadoProceso(id: number) {
    const proceso = this.proceso.find(p => p.id_procesos === id);

    if (proceso) {
      const nuevoEstado = !proceso.estado_procesos;

      this.realizarOperacionDeProceso(() => this.procesoService.updateProceso(id, { estado_procesos: nuevoEstado }), 'Estado Cambiado');
    }
  }

  eliminarProceso(id: number) {
    console.log(id);
    this.realizarOperacionDeProceso(() => this.procesoService.deleteProceso(id), 'Proceso Eliminado');
  }

  private realizarOperacionDeProceso(operacion: () => any, mensajeExitoso: string) {
    operacion().subscribe({
      next: (respuesta: any) => {
        console.log(`${mensajeExitoso} exitosamente`, respuesta);
        this.actualizarListaDeProcesos();
        this.toastr.warning(`El proceso fue ${mensajeExitoso.toLowerCase()} con éxito`, mensajeExitoso);
      },
      error: (error: any) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error(`Error al ${mensajeExitoso.toLowerCase()} el proceso`, error);
        }
      }
    });
  }
}
