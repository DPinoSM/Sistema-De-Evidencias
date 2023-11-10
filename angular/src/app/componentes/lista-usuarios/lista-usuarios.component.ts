import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/usuario.interface';
import { Rol } from 'src/app/interfaces/rol.interface';
import { RolService } from 'src/app/services/rol.service';
import { Unidad } from 'src/app/interfaces/unidad.interface';
import { UnidadService } from 'src/app/services/unidad.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css', '../../../shared-styles.css']
})

export class ListaUsuariosComponent implements OnInit {
  usuarios: User[] = [];
  usuariosOriginal: User[] | null = null;
  roles: Rol[] = [];
  unidades: Unidad[] = [];
  errorMsg: string | undefined;
  sideNavStatus: boolean = false;
  mostrarFormularioAgregarUsuario: boolean = false;
  usuarioEditId: number | null = null;
  form: FormGroup;
  private usuarioSubscription!: Subscription;
  currentPage: number = 1;
  searchTerm: string = '';

  constructor(
    private usuarioService: UsuarioService, 
    private rolService: RolService, 
    private unidadService: UnidadService, 
    private toastr: ToastrService) 
    {
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
    this.getUnidades();
  }

 

  getRoles() {
    this.rolService.getRoles().subscribe((roles) => {
        this.roles = roles;
    });
  }
  
  getUnidades() {
    this.unidadService.getUnidades().subscribe((unidades) => {
      this.unidades = unidades;
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
      const correo_usuario = this.form.get('correo_usuario')?.value;
  
      if (this.usuarioEditId) {
        const usuarioEditado: any = {
          id_usuario: this.usuarioEditId,
        };
        if (this.form.get('rut_usuario')?.dirty) {
          usuarioEditado['rut_usuario'] = rut_usuario;
        }
        if (this.form.get('correo_usuario')?.dirty) {
          usuarioEditado['correo_usuario'] = correo_usuario;
        }
        usuarioEditado['nombre_usuario'] = this.form.get('nombre_usuario')?.value;
        usuarioEditado['apellido1_usuario'] = this.form.get('apellido1_usuario')?.value;
        usuarioEditado['apellido2_usuario'] = this.form.get('apellido2_usuario')?.value;
        usuarioEditado['clave_usuario'] = this.form.get('clave_usuario')?.value;
        usuarioEditado['estado_usuario'] = this.form.get('estado_usuario')?.value;
        usuarioEditado['id_rol'] = this.form.get('id_rol')?.value;
        usuarioEditado['id_unidad'] = this.form.get('id_unidad')?.value;
  
        this.editarUsuario(this.usuarioEditId, usuarioEditado);
      } else {
        const nombre_usuario = this.form.get('nombre_usuario')?.value;
        const apellido1_usuario = this.form.get('apellido1_usuario')?.value;
        const apellido2_usuario = this.form.get('apellido2_usuario')?.value;
        const clave_usuario = this.form.get('clave_usuario')?.value;
        const estado_usuario = this.form.get('estado_usuario')?.value;
        const id_rol = this.form.get('id_rol')?.value;
        const id_unidad = this.form.get('id_unidad')?.value;
  
        if (this.usuarioExistenteEnRut(rut_usuario) || this.usuarioExistenteEnCorreo(correo_usuario)) {
          this.toastr.error('El usuario o Correo ya existe ', 'Error');
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
    }
    this.mostrarFormularioAgregarUsuario = false;
    this.cancelarEdicionUsuario();
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

  realizarBusqueda() {
    if (this.searchTerm) {
      this.currentPage = 1;
      this.getUsers (); 
    } else {

      if (this.usuariosOriginal) {
        this.usuarios = this.usuariosOriginal;
      }
    }
  }

  pageChanged(page: number) {
    this.currentPage = page;
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
        if (!this.usuariosOriginal) {
          this.usuariosOriginal = data;
        }
        
        this.usuarios = data.filter(usuario => {
          return (
            this.comienzaConCadena(usuario.rut_usuario.toString(), this.searchTerm) ||
            this.comienzaConCadena(usuario.nombre_usuario, this.searchTerm)
          );
        });
      });
  }

  editarUsuario(id: number, usuarioEditado: any) {
    this.realizarOperacionDeUsuario(() =>
      this.usuarioService.updateUser(id, usuarioEditado), 'Usuario Editado');
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
