import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AmbitoGeograficoService } from 'src/app/services/ambito-geografico.service';

interface AmbitoGeografico{
  id_ambito_geografico: number;
  nombre_ambito_geografico: string;
  estado_ambito_geografico: boolean;
}

@Component({
  selector: 'app-lista-ambito-g',
  templateUrl: './lista-ambito-g.component.html',
  styleUrls: ['./lista-ambito-g.component.css', '../../../shared-styles.css']
})
export class ListaAmbitoGComponent implements OnInit {
  // Variable para almacenar la lista de usuarios
  ambitosG: AmbitoGeografico[] = [];
  errorMsg: string | undefined; 
  sideNavStatus: boolean = false;
  
  constructor(
    private ambitoGeograficoService: AmbitoGeograficoService, private toastr: ToastrService) {} 
  ngOnInit() {

    this.getAmbitosGeograficos();
  }

  getAmbitosGeograficos() {
    this.ambitoGeograficoService.getAmbitosGeograficos().subscribe({
      next: (data: AmbitoGeografico[]) => {
        console.log('Datos en el componente:', data);
        this.ambitosG = data;
      },
      error: (error) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error('Error al obtener la lista de ambitos geograficos', error);
        }
      }
    });
  }

// Eliminar un usuario
deleteAmbitoGeografico(id: number) {
  if (id) {
    this.ambitoGeograficoService.deleteAmbitoGeografico(id).subscribe({
      next: (respuesta) => {
        console.log('Usuario eliminado exitosamente', respuesta);
        this.getAmbitosGeograficos();
        this.toastr.success('el ambito geografico fue eliminado correctamente', 'ambito geografico Eliminado');
      },
      error: (error) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error('Error al eliminar ambito geografico', error);
        }
      }
    });
  } else {
    console.error('ID de ambito geografico no válido');
  }
}

estado(ambitoGeografico: AmbitoGeografico): string {
  return ambitoGeografico.estado_ambito_geografico ? 'Activo' : 'Inactivo';
}

}


