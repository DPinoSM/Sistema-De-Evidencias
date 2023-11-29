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
export class ListaProcesosComponent implements OnInit {
  procesos: Proceso[] = [];
  errorMsg: string | undefined;
  form: FormGroup;
  procesoEditId: number | null = null;
  sideNavStatus: boolean = false;
  mostrarFormularioAgregarProcesos: boolean = false;
  private procesoSubscription!: Subscription;
  currentPage: number = 1;
  searchTerm: string = '';

  constructor(
    private procesoService: ProcesosService,
    private toastr: ToastrService
  ) {
    this.form = new FormGroup({
      codigo_procesos: new FormControl(null, [Validators.required]),
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
  }

  cancelarEdicion() {
    this.mostrarFormularioAgregarProcesos = false;
    this.procesoEditId = null;
    this.form.reset();
  }

  crearEditarProceso() {
    if (this.form.valid) {
      const codigo_procesos = this.form.get('codigo_procesos')?.value;
  
      if (this.procesoEditId) {
        const procesoEditado: any = {
          id_procesos: this.procesoEditId,
        };
  
        if (this.form.get('codigo_procesos')?.dirty) {
          procesoEditado['codigo_procesos'] = codigo_procesos;
        }
        procesoEditado['nombre_procesos'] = this.form.get('nombre_procesos')?.value;
        procesoEditado['estado_procesos'] = this.form.get('estado_procesos')?.value;
  
        this.editarProceso(this.procesoEditId, procesoEditado);
      } else {
        const nombre_procesos = this.form.get('nombre_procesos')?.value;
        const estado_procesos = this.form.get('estado_procesos')?.value;
  
        if (this.codigoExistente(codigo_procesos)) {
          this.toastr.error('El código de ese proceso ya está en uso', 'Error');
        } else {
          this.realizarOperacionDeProceso(() =>
            this.procesoService.createProceso({
              codigo_procesos: codigo_procesos,
              nombre_procesos: nombre_procesos,
              estado_procesos: estado_procesos
            }),
            'Proceso Creado'
          );
        }
      }
    }
  
    this.mostrarFormularioAgregarProcesos = false;
    this.cancelarEdicion();
  }
  

  codigoExistente(codigo_procesos: number): boolean {
    return this.procesos.some(proceso => proceso.codigo_procesos === codigo_procesos);
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

  realizarBusquedaProcesos() {
    if (this.searchTerm) {
      this.currentPage = 1;
      this.actualizarListaDeProcesos();
    } else {
      this.actualizarListaDeProcesos();
    }
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
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
        this.procesos = data;
      });
  }

  editarProceso(id: number, procesoEditado: any ) {
    this.realizarOperacionDeProceso(() =>
      this.procesoService.updateProceso(id, procesoEditado ), 'Proceso Editado');
  }

  cambiarEstadoProceso(id: number) {
    const proceso = this.procesos.find(p => p.id_procesos === id);

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
