import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProcesosService } from 'src/app/services/procesos.service';

interface Proceso{
  id_procesos?: number;
  codigo_procesos: string;
  nombre_procesos: string;
  estado_procesos: boolean;
}

@Component({
  selector: 'app-lista-procesos',
  templateUrl: './lista-procesos.component.html',
  styleUrls: ['./lista-procesos.component.css']
})

export class ListaProcesosComponent implements OnInit{
  listaProcesos: Proceso[] = [];
  errorMsg: string | undefined;

  constructor(
    private _procesoService: ProcesosService, 
    private toastr: ToastrService) {}

  ngOnInit(): void{
    this.getListProcesos();
  }

  getListProcesos() {

    this._procesoService.getListProcesos().subscribe((data: Proceso[]) => {
      //console.log(data);
      this.listaProcesos = data;

    })
  }

  traducirEstado(proceso: Proceso): string {
    return proceso.estado_procesos ? "Activo" : "Inactivo";
  }

  deleteProceso(id: number) {
    this._procesoService.deleteProceso(id).subscribe(() => {
      this.getListProcesos();
      this.toastr.warning('Proceso eliminado con exito','Proceso eliminado');
    })
    
  }
}
