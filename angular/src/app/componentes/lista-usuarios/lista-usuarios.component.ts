import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/usuario.interface';
import { Rol } from 'src/app/interfaces/rol.interface';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css', '../../../shared-styles.css']
})

export class ListaUsuariosComponent implements OnInit {
  usuarios: User[] = [];
  roles: Rol[] = [];
  errorMsg: string | undefined;
  sideNavStatus: boolean = false;
  mostrarFormularioAgregarUsuario: boolean = false;
  usuarioEditId: number | null = null;
  form: FormGroup;
  private usuarioSubscription!: Subscription;

  constructor(private usuarioService: UsuarioService,private rolService: RolService,  private toastr: ToastrService) {
    this.form = new FormGroup({
      rut_usuario: new FormControl(null, [Validators.required]),
      nombre_usuario: new FormControl('', [Validators.required]),
      apellido1_usuario: new FormControl('', [Validators.required]),
      apellido2_usuario: new FormControl('', [Validators.required]),
      clave_usuario: new FormControl('', [Validators.required]),
      correo_usuario: new FormControl('', [Validators.required]),
      estado_usuario: new FormControl(null, [Validators.required]),
      id_rol: new FormControl(null, [Validators.required]), 
      id_unidad: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.getUsers();
    this.getRoles();
  }

  getRoles() {
    this.rolService.getRoles().subscribe((roles) => {
        this.roles = roles;
    });
}
  
  mostrarAgregarEditarUsuario(id: number | null) {
    if (id !== null) {
      this.usuarioEditId = id;
      this.obtenerUsuario(id);
    } else {
      this.usuarioEditId = null;
      this.form.reset();
    }
    this.mostrarFormularioAgregarUsuario = true;
  }

  cancelarEdicionUsuario() {
    this.mostrarFormularioAgregarUsuario = false;
    this.usuarioEditId = null;
    this.form.reset();
  }

  usuarioExistenteEnRut(rut_usuario: number): boolean {
    return this.usuarios.some(usuario => usuario.rut_usuario === rut_usuario);
  }
  
  usuarioExistenteEnCorreo(correo_usuario: string): boolean {
    return this.usuarios.some(usuario => usuario.correo_usuario === correo_usuario);
  }

  crearOEditarUsuario() {
    if (this.form.valid) {
      const rut_usuario = this.form.get('rut_usuario')?.value;
      const nombre_usuario = this.form.get('nombre_usuario')?.value;
      const apellido1_usuario = this.form.get('apellido1_usuario')?.value;
      const apellido2_usuario = this.form.get('apellido2_usuario')?.value;
      const clave_usuario = this.form.get('clave_usuario')?.value;
      const correo_usuario = this.form.get('correo_usuario')?.value;
      const estado_usuario = this.form.get('estado_usuario')?.value;
      const id_rol = this.form.get('id_rol')?.value; 
      const id_unidad = this.form.get('id_unidad')?.value; 

      if (this.usuarioExistenteEnRut(rut_usuario) || this.usuarioExistenteEnCorreo(correo_usuario)) {
        this.toastr.error('El usuario o Correo ya existe ', 'Error');
      } else if (this.usuarioEditId) {
        this.editarUsuario(this.usuarioEditId, rut_usuario, nombre_usuario, apellido1_usuario, apellido2_usuario, clave_usuario, correo_usuario, estado_usuario, id_rol, id_unidad);
      } else {
        this.realizarOperacionDeUsuario(() =>
          this.usuarioService.newUser({
            rut_usuario: rut_usuario,
            nombre_usuario: nombre_usuario,
            apellido1_usuario: apellido1_usuario,
            apellido2_usuario: apellido2_usuario,
            clave_usuario: clave_usuario,
            correo_usuario: correo_usuario,
            estado_usuario: estado_usuario,
            id_rol: id_rol,
            id_unidad: id_unidad,
          }), 'Usuario Creado');
      }
    }
    this.mostrarFormularioAgregarUsuario = false;
    this.cancelarEdicionUsuario()
  }

  obtenerUsuario(id: number) {
    this.usuarioService.getUser(id).subscribe((usuario) => {
      if (usuario) {
        this.form.get('rut_usuario')?.setValue(usuario.rut_usuario);
        this.form.get('nombre_usuario')?.setValue(usuario.nombre_usuario);
        this.form.get('apellido1_usuario')?.setValue(usuario.apellido1_usuario);
        this.form.get('apellido2_usuario')?.setValue(usuario.apellido2_usuario);
        this.form.get('clave_usuario')?.setValue(usuario.clave_usuario);
        this.form.get('correo_usuario')?.setValue(usuario.correo_usuario);
        this.form.get('estado_usuario')?.setValue(usuario.estado_usuario);
        this.form.get('nombre_rol')?.setValue(usuario.nombre_rol);
        this.form.get('nombre_unidad')?.setValue(usuario.nombre_unidad);
        this.form.get('id_rol')?.setValue(usuario.id_rol);
        this.form.get('id_unidad')?.setValue(usuario.id_unidad);
      }
    });
  }

  getUsers() {
    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }
    this.usuarioSubscription = this.usuarioService.getUsers()
      .pipe(
        catchError(error => {
          this.errorMsg = 'Error al obtener la lista de usuarios';
          console.error('Error al obtener la lista de usuarios', error);
          return [];
        })
      )
      .subscribe((data: User[]) => {
        this.usuarios = data;
      });
  }

  editarUsuario(id: number, rut_usuario: string, nombre_usuario: string, 
    apellido1_usuario: string, apellido2_usuario: string, clave_usuario: string, 
    correo_usuario: string, estado_usuario: boolean, id_rol: number, id_unidad: number) {
    this.realizarOperacionDeUsuario(() =>
      this.usuarioService.updateUser(id, {
        rut_usuario: rut_usuario,
        nombre_usuario: nombre_usuario,
        apellido1_usuario: apellido1_usuario,
        apellido2_usuario: apellido2_usuario,
        clave_usuario: clave_usuario,
        correo_usuario: correo_usuario,
        estado_usuario: estado_usuario,
        id_rol: id_rol,
        id_unidad: id_unidad,
      }), 'Usuario Editado');
  }

  eliminarUsuario(id: number) {
    this.realizarOperacionDeUsuario(() => this.usuarioService.deleteUser(id), 'Usuario Eliminado');
  }

  cambiarEstadoUsuario(id: number) {
    const usuario = this.usuarios.find(u => u.id_usuario === id);

    if (usuario) {
      const nuevoEstado = !usuario.estado_usuario;

      this.realizarOperacionDeUsuario(() =>
        this.usuarioService.updateUser(id, { estado_usuario: nuevoEstado }), 'Estado Cambiado');
    }
  }

  private realizarOperacionDeUsuario(operacion: () => any, mensajeExitoso: string) {
    operacion().subscribe({
      next: (respuesta: any) => {
        console.log(`${mensajeExitoso} exitosamente`, respuesta);
        this.getUsers();
        this.toastr.success(`El usuario fue ${mensajeExitoso.toLowerCase()} con éxito`, mensajeExitoso);
      },
      error: (error: any) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error(`Error al ${mensajeExitoso.toLowerCase()} el usuario`, error);
        }
      }
    });
  }
}
