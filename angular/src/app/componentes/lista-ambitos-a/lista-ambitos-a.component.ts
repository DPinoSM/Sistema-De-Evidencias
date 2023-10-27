import { Component, OnInit } from '@angular/core';
import { AmbitoAService } from '../../services/ambito-a.service';
import { ToastrService } from 'ngx-toastr';

interface AmbitoAcademico {
  id_ambito_academico: number;
  nombre_ambito_academico: string;
  estado_ambito_academico: boolean;
}

@Component({
  selector: 'app-lista-ambitos-a',
  templateUrl: './lista-ambitos-a.component.html',
  styleUrls: ['./lista-ambitos-a.component.css', '../../../shared-styles.css']
})
export class ListaAmbitosAComponent implements OnInit {
  ambitosAcademicos: AmbitoAcademico[] = [];
  errorMsg: string | undefined;
  sideNavStatus: boolean = false;

  constructor(private ambitoAService: AmbitoAService, private toastr: ToastrService) {}

  ngOnInit() {
    this.actualizarListaDeAmbitosAcademicos();
  }

  actualizarListaDeAmbitosAcademicos() {
    this.ambitoAService.getAmbitosAcademicos().subscribe({
      next: (ambitoData: AmbitoAcademico[]) => {
        console.log('Datos en el componente:', ambitoData);
        this.ambitosAcademicos = ambitoData;
      },
      error: (error) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error('Error al obtener la lista de ámbitos académicos', error);
        }
      }
    });
  }

  // Función para traducir el valor booleano a "Activo" o "Inactivo"
  traducirEstado(ambito: AmbitoAcademico): string {
    return ambito.estado_ambito_academico ? "Activo" : "Inactivo";
  }

  eliminarAmbitoAcademico(id: number) {
    if (id) {
      this.ambitoAService.deleteAmbitoAcademico(id).subscribe({
        next: (respuesta) => {
          console.log('Ámbito académico eliminado exitosamente', respuesta);
          this.actualizarListaDeAmbitosAcademicos();
          this.toastr.success('El ámbito académico fue eliminado correctamente', 'Ámbito Académico Eliminado');
        },
        error: (error) => {
          if (error && error.msg) {
            this.errorMsg = error.msg;
            console.error('Error al eliminar el ámbito académico', error);
          }
        }
      });
    } else {
      console.error('ID de ámbito académico no válido');
    }
  }
}
