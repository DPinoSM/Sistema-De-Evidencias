import { Component, OnInit } from '@angular/core';
import { EvidenciasService } from '../../services/evidencias.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Evidencia } from 'src/app/interfaces/evidencia.interface';

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css', '../../../shared-styles.css']
})

export class ResponsableComponent implements OnInit {
  evidencias: Evidencia[] = [];
  errorMsg: string | undefined;
  private evidenciasSubscription!: Subscription;

  constructor(
    private evidenciasService: EvidenciasService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getEvidencias();
  }

  getEvidencias() {
    if (this.evidenciasSubscription) {
      this.evidenciasSubscription.unsubscribe();
    }

    this.evidenciasSubscription = this.evidenciasService.getEvidencias()
      .subscribe((data: Evidencia[]) => {
        this.evidencias = data;
      }, error => {
        this.errorMsg = 'Error al obtener la lista de evidencias';
        console.error('Error al obtener la lista de evidencias', error);
      });
  }
  //aprobarEvidencia(idEvidencia: number, comentario: string): void {
    //this.aprobarRechazarEvidencia(idEvidencia, true, comentario);
  //}

  //rechazarEvidencia(idEvidencia: number, comentario: string): void {
    //this.aprobarRechazarEvidencia(idEvidencia, false, comentario);
  //}

  //private aprobarRechazarEvidencia(idEvidencia: number, aprobado: boolean, comentario: string): void {
    //this.evidenciasService.aprobarRechazarEvidencia(idEvidencia, aprobado, comentario)
      //.subscribe(
        //() => {
          //this.toastr.success(`La evidencia fue ${aprobado ? 'aprobada' : 'rechazada'} con éxito`, 'Operación Exitosa');
          //this.getEvidencias();  
        //},
        //error => {
          //console.error(`Error al ${aprobado ? 'aprobar' : 'rechazar'} la evidencia`, error);
          //this.toastr.error('Error al procesar la operación', 'Error');
        //}
      //);
  //}
}
