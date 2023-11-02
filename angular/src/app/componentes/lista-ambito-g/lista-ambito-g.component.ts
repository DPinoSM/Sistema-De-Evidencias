import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AmbitoGeografico } from 'src/app/interfaces/ambito-geografico.interface';
import { AmbitoGeograficoService } from 'src/app/services/ambito-geografico.service';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-ambito-g',
  templateUrl: './lista-ambito-g.component.html',
  styleUrls: ['./lista-ambito-g.component.css', '../../../shared-styles.css']
})
export class ListaAmbitoGComponent implements OnInit {
  ambitosG: AmbitoGeografico[] = [];
  errorMsg: string | undefined;
  form: FormGroup;
  ambitoGeograficoEditId: number | null = null;
  sideNavStatus: boolean = false;
  mostrarFormularioAgregarAmbitoGeografico: boolean = false;
  private ambitoGeSubscription!: Subscription;

  constructor(
    private ambitoGeograficoService: AmbitoGeograficoService,
    private toastr: ToastrService
  ) {
    this.form = new FormGroup({
      nombre_ambito_geografico: new FormControl('', [Validators.required]),
      estado_ambito_geografico: new FormControl(null, [Validators.required]),
    });    
  }

  ngOnInit() {
    this.getAmbitosGeograficos();
  }

  mostrarAgregarEditarAmbitoGeografico(id: number | null) {
    if (id !== null) {
      this.ambitoGeograficoEditId = id;
      this.obtenerAmbitoGeografico(id);
    } else {
      this.ambitoGeograficoEditId = null;
      this.form.reset();
    }
    this.mostrarFormularioAgregarAmbitoGeografico = true;
  }

  cancelarEdicionAmbitoGeografico() {
    this.mostrarFormularioAgregarAmbitoGeografico = false;
    this.ambitoGeograficoEditId = null;
    this.form.reset();
  }

  crearOEditarAmbitoGeografico() {
    if (this.form.valid) {
      const nombre_ambito_geografico = this.form.get('nombre_ambito_geografico')?.value;
      const estado_ambito_geografico = this.form.get('estado_ambito_geografico')?.value;
  
      if (this.ambitoGeograficoEditId) {
        this.editarAmbitoGeografico(this.ambitoGeograficoEditId, nombre_ambito_geografico, estado_ambito_geografico);
      } else {
        if (this.nombreAmbitoGeograficoExistente(nombre_ambito_geografico)) {
          this.toastr.error('No se puede crear un ámbito geográfico con el mismo nombre existente', 'Error');
        } else {
          this.realizarOperacionDeAmbitoG(() =>
            this.ambitoGeograficoService.newAmbitoGeografico({
              nombre_ambito_geografico: nombre_ambito_geografico,
              estado_ambito_geografico: estado_ambito_geografico
            }), 'Ámbito Geográfico Creado');
        }
      }
    }
  
    this.mostrarFormularioAgregarAmbitoGeografico = false;
  }
  

  nombreAmbitoGeograficoExistente(nombreAmbitoGeografico: string): boolean {
    return this.ambitosG.some(ambito => ambito.nombre_ambito_geografico === nombreAmbitoGeografico);
  }
  

  obtenerAmbitoGeografico(id: number) {
    this.ambitoGeograficoService.getAmbitosGeografico(id).subscribe((ambito) => {
      if (ambito) {
        this.form.get('nombre_ambito_geografico')?.setValue(ambito.nombre_ambito_geografico);
        this.form.get('estado_ambito_geografico')?.setValue(ambito.estado_ambito_geografico);
      }
    });
  }

  getAmbitosGeograficos() {
    if (this.ambitoGeSubscription) {
      this.ambitoGeSubscription.unsubscribe();
    }
    this.ambitoGeSubscription = this.ambitoGeograficoService.getAmbitosGeograficos()
      .pipe(
        catchError(error => {
          this.errorMsg = 'Error al obtener la lista de ámbitos geográficos';
          console.error('Error al obtener la lista de ámbitos geográficos', error);
          return [];
        })
      )
      .subscribe((data: AmbitoGeografico[]) => {
        this.ambitosG = data;
      });
  }

  editarAmbitoGeografico(id: number, nombre_ambito_geografico: string, estado_ambito_geografico: boolean) {
    this.realizarOperacionDeAmbitoG(() =>
      this.ambitoGeograficoService.updateAmbitoGeografico(id, {
        nombre_ambito_geografico: nombre_ambito_geografico,
        estado_ambito_geografico: estado_ambito_geografico
      }), 'Ámbito Geográfico Editado');
  }

  eliminarAmbitoGeografico(id: number) {
    this.realizarOperacionDeAmbitoG(() => this.ambitoGeograficoService.deleteAmbitoGeografico(id), 'Ámbito Geográfico Eliminado');
  }

  cambiarEstadoAmbitoGeografico(id: number) {
    const ambito = this.ambitosG.find(u => u.id_ambito_geografico === id);

    if (ambito) {
      const nuevoEstado = !ambito.estado_ambito_geografico;

      this.realizarOperacionDeAmbitoG(() =>
        this.ambitoGeograficoService.updateAmbitoGeografico(id, { estado_ambito_geografico: nuevoEstado }), 'Estado Cambiado');
    }
  }

  private realizarOperacionDeAmbitoG(operacion: () => any, mensajeExitoso: string) {
    operacion().subscribe({
      next: (respuesta: any) => {
        console.log(`${mensajeExitoso} exitosamente`, respuesta);
        this.getAmbitosGeograficos();
        this.toastr.success(`El ámbito geográfico fue ${mensajeExitoso.toLowerCase()} con éxito`, mensajeExitoso);
      },
      error: (error: any) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error(`Error al ${mensajeExitoso.toLowerCase()} el ámbito geográfico`, error);
        }
      }
    });
  }
}
