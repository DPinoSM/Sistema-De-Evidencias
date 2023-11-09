// Importaciones de clases y módulos necesarios para el componente.
import { Component, OnInit } from '@angular/core';
// 'Component' y 'OnInit' se importan del módulo '@angular/core' y se usan para definir componentes y métodos de inicialización.

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/login.interface';
import { LoginResponse } from '../../services/auth.service';
// Estas importaciones son para clases y servicios específicos necesarios en este componente.

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
// Configuración del componente 'LoginComponent' con su selector, plantilla y estilos.

export class LoginComponent implements OnInit {
  // Declaración de propiedades del componente.
  loading: boolean = false;
  rut_usuario: number | null = null; 
  clave_usuario: string = '';

  constructor(
    private toastr: ToastrService, // Servicio para mostrar notificaciones emergentes (toasts).
    private _authService: AuthService, // Servicio para autenticación del usuario.
    private router: Router, // Servicio de enrutamiento para redirigir a otras páginas.
    private _errorService: ErrorService // Servicio para manejar errores.
  ) {}

  ngOnInit(): void {}
  // Método que se ejecuta cuando se inicia el componente, pero no realiza ninguna operación en este ejemplo.

  login() {
    // Validación de que el usuario haya ingresado datos.
    if ( this.rut_usuario === null || isNaN(this.rut_usuario) || this.clave_usuario == '') {
       // Se muestra un mensaje de error si los campos de usuario o contraseña están vacíos.
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
   

    // Creación de un objeto que contiene el nombre de usuario y la contraseña proporcionados.
    const user: User = {
      rut_usuario: this.rut_usuario,
      clave_usuario: this.clave_usuario,
    };

    this.loading = true; // Se establece la variable de carga en true.

    // Llamada al servicio de autenticación para iniciar sesión y suscripción a la respuesta.
    this._authService.login(user).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem('rol', response.rol.toString()); 
        this.redirectBasedOnRole(response.rol);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    });
  }
  // Método para manejar el inicio de sesión del usuario.

  redirectBasedOnRole(rol: number) {
    // Función que redirige al usuario basado en su rol.
    switch (rol) {
      case 1:
        this.router.navigate(['/admin']);
        break;
      case 2:
        this.router.navigate(['/dac']); 
        break;
      case 3:
        this.router.navigate(['/comite']);
        break;
      case 4:
        this.router.navigate(['/responsable']);
        break;
      case 5:
        this.router.navigate(['/inicio']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
  // Método para redirigir al usuario a rutas específicas según su rol.
}
