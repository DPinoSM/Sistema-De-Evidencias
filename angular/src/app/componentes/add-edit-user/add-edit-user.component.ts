import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css', '../../../shared-styles.css']
})
export class AddEditUserComponent implements OnInit{
  usuarios: any[] = [];
  errorMsg: string | undefined;
  formUsuario: FormGroup;
  editUsuarioId: number | null = null;
  sideNavStatus: boolean = false;


constructor(
  private usuarioService: UsuarioService,
  private router: Router,
  private route: ActivatedRoute,
  private toastr: ToastrService,
  private fb: FormBuilder
  ){
  this.formUsuario = this.fb.group({
  rut_usuario: ['', Validators.required],
  nombre_usuario:['', Validators.required],
  apellido1_usuario:['', Validators.required],
  apellido2_usuario:['', Validators.required],
  clave_usuario:['', Validators.required],
  correo_usuario: ['', Validators.required],
  estado_usuario: [true]
  
})
}
ngOnInit():void {
  this.route.params.subscribe(params => {
    const id = +params['id'];
    if (!isNaN(id)) {
      this.editUsuarioId = id;
      this.getUser(id);
    }
  });
  //this.getUsers();
}

guardarUsuario(event: Event) {
  event.preventDefault();

  if (this.formUsuario.valid) {
    const rutUsuario = this.formUsuario.get('rut_usuario')?.value;
    const nombreUsuario = this.formUsuario.get('nombre_usuario')?.value;
    const apellido1Usuario = this.formUsuario.get('apellido1_usuario')?.value;
    const apellido2Usuario = this.formUsuario.get('apellido2_usuario')?.value;
    const claveUsuario = this.formUsuario.get('clave_usuario')?.value;
    const correoUsuario = this.formUsuario.get('correo_usuario')?.value;
    const estadoUsuario = this.formUsuario.get('estado_usuario')?.value;

    if (this.editUsuarioId !== null) {
      this.updateUser(this.editUsuarioId, rutUsuario, nombreUsuario, apellido1Usuario, apellido2Usuario, claveUsuario, correoUsuario, estadoUsuario);
    } else {
      this.usuarioService.newUser({
        rut_usuario: rutUsuario, 
        nombre_usuario : nombreUsuario,
        apellido1_usuario: apellido1Usuario,
        apellido2_usuario: apellido2Usuario,
        clave_usuario: claveUsuario,
        correo_usuario: correoUsuario,
        estado_usuario: estadoUsuario
    
      }).subscribe({
        next: (respuesta) => {
          console.log('Usuario creada exitosamente', respuesta);
          this.getUsers();
          this.toastr.success('Usuario fue creado con éxito', 'Usuario Creado');
        },
        error: (error) => {
          if (error && error.msg) {
            this.errorMsg = error.msg;
            console.error('Error al crear rut usuario', error);
          }
        }
      });
    }
  }
  this.formUsuario.reset();
}

getUser(id: number) {
  this.usuarioService.getUser(id).subscribe( user => {
    console.log('Datos del usuario recibidos:', user);
    if (user && this.formUsuario) {
      console.log('Asignando datos del usuario al formulario:', user);
      this.formUsuario.get('rut_usuario')?.setValue(user.rut_usuario);
      this.formUsuario.get('nombre_usuario')?.setValue (user.nombre_usuario);
      this.formUsuario.get('apellido1_usuario')?.setValue(user.apellido1_usuario);
      this.formUsuario.get('apellido2_usuario')?.setValue (user.apellido2_usuario);
      this.formUsuario.get('clave_usuario')?.setValue(user.clave_usuario);
      this.formUsuario.get('correo_usuario')?.setValue(user.correo_usuario);
      this.formUsuario.get('estado_usuario')?.setValue(user.estado_usuario)
    }
  });
}




getUsers() {
  this.usuarioService.getUsers().subscribe((data) => {
    this.usuarios = data;
    this.formUsuario.get('rut_usuario')?.setValue('');
    this.formUsuario.get('nombre_usuario')?.setValue ('');
    this.formUsuario.get('apellido1_usuario')?.setValue('');
    this.formUsuario.get('apellido2_usuario')?.setValue ('');
    this.formUsuario.get('clave_usuario')?.setValue('');
    this.formUsuario.get('correo_usuario')?.setValue('');
    this.formUsuario.get('estado_usuario')?.setValue('')
  });
}

updateUser(id: number, rutUsuario: string, nombreUsuario: string, apellido1Usuario: string, apellido2Usuario: string, claveUsuario: string, correoUsuario: string, estadoUsuario: Boolean) {
  if (this.formUsuario) {
    this.usuarioService.updateUser(id, {
      rut_usuario: rutUsuario, 
      nombre_usuario : nombreUsuario,
      apellido1_usuario: apellido1Usuario,
      apellido2_usuario: apellido2Usuario,
      clave_usuario: claveUsuario,
      correo_usuario: correoUsuario,
      estado_usuario: estadoUsuario

    }).subscribe({
      next: (respuesta) => {
        console.log('usuario actualizado exitosamente', respuesta);
        this.getUsers();
        this.toastr.success('el usuario fue editado correctamente');
      },
      error: (error) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error('Error al actualizar rut', error);
        }
      }
    });
  }
}
}







