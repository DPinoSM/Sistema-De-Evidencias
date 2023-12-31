import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AmbitoAService } from 'src/app/services/ambito-a.service';
import { AmbitoAcademico } from 'src/app/interfaces/ambito-academico.interface';


@Component({
  selector: 'app-lista-ambitos-a',
  templateUrl: './lista-ambitos-a.component.html',
  styleUrls: ['./lista-ambitos-a.component.css', '../../../shared-styles.css']
})
export class ListaAmbitosAComponent implements OnInit {
  ambitosAcademicos: AmbitoAcademico[] = [];
  ambitoAcaOriginal: AmbitoAcademico[] | null = null;
  errorMsg: string | undefined;
  form: FormGroup;
  ambitoAcademicoEditId: number | null = null;
  sideNavStatus: boolean = false;
  mostrarFormularioAgregarAmbitoAcademico: boolean = false;
  private ambitoAcSubcription!: Subscription;
  currentPage: number = 1;
  searchTerm: string = '';

  constructor(
    private ambitoAService: AmbitoAService,
    private toastr: ToastrService) {
    this.form = new FormGroup({
      nombre_ambito_academico: new FormControl('', [Validators.required]),
      estado_ambito_academico: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.actualizarListaDeAmbitosAcademicos();
  }

  mostrarAgregarEditarAmbitoAcademico(id: number | null) {
    if (id !== null) {
      this.ambitoAcademicoEditId = id;
      this.obtenerAmbitoAcademico(id);
    } else {
      this.ambitoAcademicoEditId = null;
      this.form.reset();
    }
    this.mostrarFormularioAgregarAmbitoAcademico = true;
  }

  cancelarEdicionAmbitoAcademico() {
    this.mostrarFormularioAgregarAmbitoAcademico = false;
    this.ambitoAcademicoEditId = null;
    this.form.reset();
  }

  crearOEditarAmbitoAcademico() {
    if (this.form.valid) {
      const nombre_ambito_academico = this.form.get('nombre_ambito_academico')?.value;
      const estado_ambito_academico = this.form.get('estado_ambito_academico')?.value;

      if (this.nombreAmbitoAcademicoExistente(nombre_ambito_academico)) {
        this.toastr.error('Ya existe un Ámbito Academico con ese nombre', 'Error');
      } else {
        if (this.ambitoAcademicoEditId) {
        this.editarAmbitoAcademico(this.ambitoAcademicoEditId, nombre_ambito_academico, estado_ambito_academico);
      } else {
        this.realizarOperacionDeAmbitoA(() =>
          this.ambitoAService.newAmbitoAcademico({ 
            nombre_ambito_academico: nombre_ambito_academico, 
            estado_ambito_academico: estado_ambito_academico 
          }), 'Ambito Academico Creado');      

        }
      }
    }      
    this.mostrarFormularioAgregarAmbitoAcademico = false;
    this.cancelarEdicionAmbitoAcademico()
    this.cancelarEdicionAmbitoAcademico()
  }

  nombreAmbitoAcademicoExistente(nombre_ambito_academico: string): boolean {
    return this.ambitosAcademicos.some(ambito_academico => ambito_academico.nombre_ambito_academico === nombre_ambito_academico);
  }

  obtenerAmbitoAcademico(id: number) {
    this.ambitoAService.getAmbitoAcademico(id).subscribe((ambito) => {
      if (ambito) {
        this.form.get('nombre_ambito_academico')?.setValue(ambito.nombre_ambito_academico);
        this.form.get('estado_ambito_academico')?.setValue(ambito.estado_ambito_academico);
      }
    });
  }

  realizarBusquedaAmbitoAca() {
    if (this.searchTerm) {
      this.currentPage = 1;
      this. actualizarListaDeAmbitosAcademicos(); 
    } else {

      if (this.ambitoAcaOriginal) {
        this.ambitosAcademicos = this.ambitoAcaOriginal;
      }
    }
  }

  pageChanged(page: number) {
    this.currentPage = page;
  }

  actualizarListaDeAmbitosAcademicos() {
    if (this.ambitoAcSubcription){
      this.ambitoAcSubcription.unsubscribe();
    }
    this.ambitoAcSubcription = this.ambitoAService.getAmbitosAcademicos()
    .pipe(
      catchError(error => {
        console.error('Error al obtener Ambito Academico:', error);
        return [];
      })
    )
    .subscribe((data: AmbitoAcademico[]) => {
      if(!this.ambitoAcaOriginal){
        this.ambitoAcaOriginal = data;
      }
      this.ambitosAcademicos = data.filter(ambitoAcademico => {
        return (
          this.comienzaConCadena(ambitoAcademico.id_ambito_academico.toString(), this.searchTerm) ||
          this.comienzaConCadena(ambitoAcademico.nombre_ambito_academico, this.searchTerm)
        );
      });
    });
}

  comienzaConCadena(cadena: string, input: string): boolean {
    if (!cadena || !input) {
      return true; 
    }
  
    cadena = cadena.toLowerCase();
    input = input.toLowerCase();
  
    if (!isNaN(Number(input))) {
      return cadena === input;
    } else {
      return cadena.includes(input);
    }
  }

  editarAmbitoAcademico(id: number, nombre_ambito_academico: string, estado_ambito_academico: boolean) {
    this.realizarOperacionDeAmbitoA(() => 
      this.ambitoAService.updateAmbitoAcademico(id, { 
        nombre_ambito_academico: nombre_ambito_academico, 
        estado_ambito_academico: estado_ambito_academico 
      }), 'Ambito Academico Editada');
  }

  eliminarAmbitoAcademico(id: number) {
    this.realizarOperacionDeAmbitoA(() => this.ambitoAService.deleteAmbitoAcademico(id), 'Ambito Academico Eliminada');
  }

  cambiarEstadoAmbitoAcademico(id: number) {
    const Ambito = this.ambitosAcademicos.find(u => u.id_ambito_academico === id);

    if (Ambito) {
      const nuevoEstado = !Ambito.estado_ambito_academico;

      this.realizarOperacionDeAmbitoA(() => this.ambitoAService.updateAmbitoAcademico(id, { estado_ambito_academico: nuevoEstado }), 'Estado Cambiado');
    }
  }

  private realizarOperacionDeAmbitoA(operacion: () => any, mensajeExitoso: string) {
    operacion().subscribe({
      next: (respuesta: any) => {
        console.log(`${mensajeExitoso} exitosamente`, respuesta);
        this.actualizarListaDeAmbitosAcademicos();
        this.toastr.warning(`El ámbito academico fue ${mensajeExitoso.toLowerCase()} con éxito`, mensajeExitoso);
      },
      error: (error: any) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error(`Error al ${mensajeExitoso.toLowerCase()} el ámbito academico`, error);
        }
      }
    });
  }
}
