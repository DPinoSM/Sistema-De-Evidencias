import { Component, OnInit } from '@angular/core';
import { RolService } from '../../services/rol.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Rol } from 'src/app/interfaces/rol.interface';

@Component({
  selector: 'app-listaroles',
  templateUrl: './listarol.component.html',
  styleUrls: ['./listarol.component.css', '../../../shared-styles.css']
})

export class ListarolComponent implements OnInit {
  roles: any[] = [];
  nombreRol: string = '';
  errorMsg: string | undefined;
  form: FormGroup;
  sideNavStatus: boolean = false;
  editRoleId: number | null = null;
  mostrarFormularioAgregarRol: boolean = false;
  private rolesSubscription!: Subscription;

  constructor(private rolService: RolService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.editRoleId = id;
        this.obtenerRol(id);
        this.mostrarFormularioAgregarRol = true;
      }
    });
    this.actualizarListaDeRoles();
  }

  mostrarFormularioAgregarEditarRol(id: number | null) {
    if (id !== null) {
      this.editRoleId = id;
      this.obtenerRol(id);
    } else {
      this.editRoleId = null;
      this.form.reset();
    }
    this.mostrarFormularioAgregarRol = true;
  }

  cancelarEdicion() {
    this.mostrarFormularioAgregarRol = false;
    this.editRoleId = null;
    this.form.reset();
  }

  crearNuevoRol() {
    if (this.form.valid) {
      const nombreRol = this.form.get('nombre')?.value;

      if (this.editRoleId) {
        this.editarRol(this.editRoleId, nombreRol);
      } else {
        this.realizarOperacionDeRol(() => this.rolService.createRol(nombreRol), 'Rol Creado');
      }
    }

    this.mostrarFormularioAgregarRol = false;
  }

  private realizarOperacionDeRol(operacion: () => any, mensajeExitoso: string) {
    operacion().subscribe({
      next: (respuesta: any) => {
        console.log(`${mensajeExitoso} exitosamente`, respuesta);
        this.actualizarListaDeRoles();
        this.toastr.warning(`El rol fue ${mensajeExitoso.toLowerCase()} con éxito`, mensajeExitoso);
      },
      error: (error: any) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error(`Error al ${mensajeExitoso.toLowerCase()} el rol`, error);
        }
      }
    });
  }

  obtenerRol(id: number) {
    this.rolService.getRol(id).subscribe(rol => {
      if (rol) {
        this.form.get('nombre')?.setValue(rol.nombre);
      }
    });
  }

  actualizarListaDeRoles() {
    if (this.rolesSubscription) {
      this.rolesSubscription.unsubscribe();
    }
    this.rolesSubscription = this.rolService.getRoles()
      .pipe(
        catchError(error => {
          console.error('Error al obtener roles:', error);
          return [];
        })
      )
      .subscribe((data: any) => {
        this.roles = data;
      });
  }

  editarRol(id: number, nombre: string) {
    this.realizarOperacionDeRol(() => this.rolService.updateRol(id, nombre), 'Rol Editado');
  }

  eliminarRol(id: number) {
    this.rolService.deleteRol(id).subscribe(() => {
      this.actualizarListaDeRoles();
      this.toastr.warning('El rol fue eliminado con éxito', 'Rol eliminado');
    });
  }
}
