import { Component, OnInit } from '@angular/core';
import { RolService } from '../../services/rol.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Rol } from '../../interfaces/rol.interface';

@Component({
  selector: 'app-listaroles',
  templateUrl: './listarol.component.html',
  styleUrls: ['./listarol.component.css', '../../../shared-styles.css']
})

export class ListarolComponent implements OnInit {
  roles: Rol[] = [];
  rolesOriginal: Rol[] | null = null;
  errorMsg: string | undefined;
  form: FormGroup;
  sideNavStatus: boolean = false;
  editRoleId: number | null = null;
  mostrarFormularioAgregarRol: boolean = false;
  private rolesSubscription!: Subscription;
  currentPage: number = 1;
  searchTerm: string = '';

  constructor(private rolService: RolService, private toastr: ToastrService) {
    this.form = new FormGroup({
      nombre_rol: new FormControl('', [Validators.required]) 
    });
  }

  ngOnInit() {
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
      const nombre_rol = this.form.get('nombre_rol')?.value;
      
      if (this.nombreRolExistente(nombre_rol)) {
        this.toastr.error('Ya existe un rol con ese nombre', 'Error');
      } else if (this.editRoleId) {
        this.editarRol(this.editRoleId, nombre_rol);
      } else {
        this.errorMsg = undefined;
        this.realizarOperacionDeRol(() => 
          this.rolService.createRol(nombre_rol), 'Rol Creado');
      }
    }
    this.mostrarFormularioAgregarRol = false;
    this.cancelarEdicion();
  }

  nombreRolExistente(nombre_rol: string): boolean {
    return this.roles.some(rol => rol.nombre_rol === nombre_rol);
  }

  obtenerRol(id: number) {
    this.rolService.getRol(id).subscribe((rol: Rol) => {
      if (rol) {
        this.form.get('nombre_rol')?.setValue(rol.nombre_rol);
      }
    });
  }

  realizarBusqueda() {
    if (this.searchTerm) {
      this.currentPage = 1;
      this.actualizarListaDeRoles(); 
    } else {

      if (this.rolesOriginal) {
        this.roles = this.rolesOriginal;
        
      }
    }
  }


  pageChanged(page: number) {
    this.currentPage = page;
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
      .subscribe((data: Rol[]) => {
        if (!this.rolesOriginal) {
          this.rolesOriginal = data;
        }
        
        this.roles = data.filter(rol => {
          return (
            this.comienzaConCadena(rol.id_rol.toString(), this.searchTerm) ||
            this.comienzaConCadena(rol.nombre_rol, this.searchTerm)
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
  

  editarRol(id: number, nombre_rol: string) {
    this.realizarOperacionDeRol(() => 
      this.rolService.updateRol(id, nombre_rol), 'Rol Editado');
  }

  eliminarRol(id: number) {
    this.realizarOperacionDeRol(() => 
      this.rolService.deleteRol(id), 'Registro Eliminado');
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
}
