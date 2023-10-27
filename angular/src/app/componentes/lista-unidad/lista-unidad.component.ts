import { Component, OnInit } from '@angular/core';
import { UnidadService } from '../../services/unidad.service';
import { ToastrService } from 'ngx-toastr';

interface Unidad {
  id_unidad: number;
  nombre_unidad: string;
  unidad_defecto: boolean; 
}


@Component({
  selector: 'app-lista-unidad',
  templateUrl: './lista-unidad.component.html',
  styleUrls: ['./lista-unidad.component.css', '../../../shared-styles.css']
})
export class ListaUnidadComponent implements OnInit {
  unidades: Unidad[] = [];
  errorMsg: string | undefined;
  sideNavStatus: boolean = false;

  constructor(private unidadService: UnidadService, private toastr: ToastrService) {}

  ngOnInit() {
    this.actualizarListaDeUnidades();
  }

  actualizarListaDeUnidades() {
    this.unidadService.getUnidades().subscribe({
      next: (data: Unidad[]) => {
        console.log('Datos en el componente:', data);
        this.unidades = data;
      },
      error: (error) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error('Error al obtener la lista de unidades', error);
        }
      }
    });
  }
  
  // Función para traducir el valor booleano a "Activo" o "Inactivo"
  traducirEstado(unidad: Unidad): string {
    return unidad.unidad_defecto ? "Activo" : "Inactivo";
  }
  
  

  eliminarUnidad(id: number) {
    if (id) {
      this.unidadService.deleteUnidad(id).subscribe({
        next: (respuesta) => {
          console.log('Unidad eliminada exitosamente', respuesta);
          this.actualizarListaDeUnidades();
          this.toastr.success('La unidad fue eliminada correctamente', 'Unidad Eliminada');
        },
        error: (error) => {
          if (error && error.msg) {
            this.errorMsg = error.msg;
            console.error('Error al eliminar la unidad', error);
          }
        }
      });
    } else {
      console.error('ID de unidad no válido');
    }
  }
}
