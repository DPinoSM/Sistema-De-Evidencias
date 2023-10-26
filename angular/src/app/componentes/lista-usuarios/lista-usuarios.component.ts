import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

 interface User{
  id_usuario: number;
  rut_usuario: string;
  nombre_usuario: string ;
  apellido1_usuario: string;
  apellido2_usuario: string;
  clave_usuario: string;
  correo_usuario: string;
  estado_usuario: boolean;
}

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})

export class ListaUsuariosComponent  implements OnInit {
  // Variable para almacenar la lista de usuarios
  usuarios: User[] = [];
  errorMsg: string | undefined;
  


  constructor(private usuarioService: UsuarioService, private toastr: ToastrService) {} 
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usuarioService.getUsers().subscribe({
      next: (data: User[]) => {
        console.log('Datos en el componente:', data);
        this.usuarios = data;
      },
      error: (error) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error('Error al obtener la lista de usuarios', error);
        }
      }
    });
  }

// Eliminar un usuario
deleteUser(id: number) {
  if (id) {
    this.usuarioService.deleteUser(id).subscribe({
      next: (respuesta) => {
        console.log('Usuario eliminado exitosamente', respuesta);
        this.getUsers();
        this.toastr.success('el usuario fue eliminado correctamente', 'Usuario Eliminado');
      },
      error: (error) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error('Error al eliminar usuario', error);
        }
      }
    });
  } else {
    console.error('ID de usuario no válido');
  }
}
//estado_usuario
estado(user: User): string{
  return user.estado_usuario? "Activo" : "Inactivo"

}
}



 