
import { Component, OnInit } from '@angular/core';  
import { RolService } from '../../services/rol.service';  
import { FormGroup, FormControl, Validators } from '@angular/forms';  
import { ActivatedRoute } from '@angular/router';  
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-edit-roles',  
  templateUrl: './add-edit-roles.component.html',  
  styleUrls: ['./add-edit-roles.component.css']  
})

export class AddEditRolesComponent implements OnInit {
  roles: any[] = [];
  nombreRol: string = '';
  errorMsg: string | undefined;
  form: FormGroup;
  editRoleId: number | null = null;

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
        this.IdRol(id);
      }
    });
    this.actualizarListaDeRoles();
  }

  crearNuevoRol() {
    if (this.form.valid) {
      const nombreRol = this.form.get('nombre')?.value;

      if (this.editRoleId) {
        this.editarRol(this.editRoleId, nombreRol);
      } else {
        this.rolService.createRol(nombreRol).subscribe({
          next: (respuesta) => {
            console.log('Rol creado exitosamente', respuesta);
            this.actualizarListaDeRoles();
            this.toastr.warning('El rol fue creado con exito', 'Rol Creado');
          },
          error: (error) => {
            if (error && error.msg) {
              this.errorMsg = error.msg;
              console.error('Error al crear el rol', error);
            }
          }
        });
      }
    }
  }

  // Método para obtener los detalles de un rol por su 'id'.
  IdRol(id: number) {
    this.rolService.getRol(id).subscribe(rol => {
      if (rol) {
        this.form.get('nombre')?.setValue('');  
      }
    });
  }

  // Método para actualizar la lista de roles.
  actualizarListaDeRoles() {
    this.rolService.getRoles().subscribe((data) => {
      this.roles = data;  
    });
  }

  editarRol(id: number, nombre: string) {
    this.rolService.updateRol(id, nombre).subscribe({
      next: (respuesta) => {
        console.log('Rol actualizado exitosamente', respuesta);
        this.actualizarListaDeRoles();
        this.toastr.warning('El rol fue editado correctamente', 'Rol editado');
      },
      error: (error) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error('Error al actualizar el rol', error);
        }
      }
  });
}
}
