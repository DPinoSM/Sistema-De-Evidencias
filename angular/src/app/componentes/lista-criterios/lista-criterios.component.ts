import { Component, OnInit } from '@angular/core';
import { CriterioService } from '../../services/criterio.service';
import { ToastrService } from 'ngx-toastr';

interface Criterio {
  id_criterios: number;
  nombre_criterios: string;
  codigo_criterios: number;
  descripcion_criterios: string;
  estado_criterios: boolean;
}

@Component({
  selector: 'app-lista-criterios',
  templateUrl: './lista-criterios.component.html',
  styleUrls: ['./lista-criterios.component.css', '../../../shared-styles.css']
})
export class ListaCriteriosComponent implements OnInit {
  criterios: Criterio[] = [];
  errorMsg: string | undefined;
  sideNavStatus: boolean = false;

  constructor(private criterioService: CriterioService, private toastr: ToastrService) {}

  ngOnInit() {
    this.actualizarListaDeCriterios();
  }

  actualizarListaDeCriterios() {
    this.criterioService.getCriterios().subscribe({
      next: (data: Criterio[]) => {
        console.log('Datos en el componente:', data);
        this.criterios = data;
      },
      error: (error) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error('Error al obtener la lista de criterios', error);
        }
      }
    });
  }

  traducirEstado(criterio: Criterio): string {
    return criterio.estado_criterios ? "Activo" : "Inactivo";
  }

  eliminarCriterio(id: number) {
    if (id) {
      this.criterioService.deleteCriterio(id).subscribe({
        next: (respuesta) => {
          console.log('Criterio eliminado exitosamente', respuesta);
          this.actualizarListaDeCriterios();
          this.toastr.success('El criterio fue eliminado correctamente', 'Criterio Eliminado');
        },
        error: (error) => {
          if (error && error.msg) {
            this.errorMsg = error.msg;
            console.error('Error al eliminar el criterio', error);
          }
        }
      });
    } else {
      console.error('ID de criterio no válido');
    }
  }
}
