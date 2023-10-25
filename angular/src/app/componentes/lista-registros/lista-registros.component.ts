import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-registros',
  templateUrl: './lista-registros.component.html',
  styleUrls: ['./lista-registros.component.css']
})
export class ListaRegistrosComponent implements OnInit {
  registros: any[] = [];
  newRegistroData: any;
  private registrosSubscription!: Subscription;

  constructor(private registroService: RegistroService, private toastr: ToastrService ) {
    this.newRegistroData = {
      id_registro: '',
      datos_registro: '',
      contenido_registro: ''
    };
  }

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros() {
    if (this.registrosSubscription) {
      this.registrosSubscription.unsubscribe();
    }
    this.registrosSubscription = this.registroService.getRegistros()
      .pipe(
        catchError(error => {
          console.error('Error al obtener registros:', error);
          return [];
        })
      )
      .subscribe((data: any) => {
        this.registros = data;
      });
  }

  eliminarRegistro(id: number) {
    this.registroService.deleteRegistro(id).subscribe(() => {
      this.getRegistros();
      this.toastr.warning('El registro fue eliminado con éxito', 'Registro eliminado');
    });
  }
}
