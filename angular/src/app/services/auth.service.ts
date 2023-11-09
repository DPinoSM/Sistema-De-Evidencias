import { Injectable } from '@angular/core';
// Importamos 'Injectable' de '@angular/core', que se utiliza para marcar la clase como un servicio que puede ser inyectado en otros componentes.

import { HttpClient } from '@angular/common/http';
// Importamos 'HttpClient' de '@angular/common/http', que se utiliza para realizar solicitudes HTTP a un servidor.

import { Observable } from 'rxjs';
// Importamos 'Observable' de 'rxjs', que se utiliza para manejar secuencias asincrónicas de datos.

import { User } from '../interfaces/login.interface';
// Importamos 'User' desde un archivo en la carpeta 'interfaces', que define la estructura de datos para un usuario.

import { tap } from 'rxjs';
// Importamos 'tap' de 'rxjs', que se utiliza para realizar acciones secundarias en una secuencia de observables sin modificar los datos.

export interface LoginResponse {
  token: string;
  rol: number;
}
// Definimos una interfaz 'LoginResponse' que describe la estructura de la respuesta de inicio de sesión.

@Injectable({
  providedIn: 'root'
})
// Marcamos la clase 'AuthService' como un servicio que se proporcionará en la raíz de la aplicación.

export class AuthService {
  private ApiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.ApiUrl}/login`, user)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token); 
          localStorage.setItem('rol', response.rol.toString()); 
        })
      );
  }
  // Método 'login' que realiza una solicitud POST al servidor para iniciar sesión y devuelve un observable de tipo 'LoginResponse'.

  // La solicitud se hace a la URL compuesta por 'ApiUrl' y 'ApiiUrl' seguido de '/login' y se envía el objeto 'user' en el cuerpo de la solicitud.

  // Después de recibir la respuesta exitosa, se utiliza 'tap' para almacenar el token y el rol en el almacenamiento local del navegador.
}
