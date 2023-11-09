import { Injectable } from '@angular/core';
// Importamos 'Injectable' de '@angular/core' para marcar la clase como un servicio que puede ser inyectado en otros componentes.

import {
  //HttpRequest: Esta clase representa una solicitud HTTP saliente. Se utiliza para definir una solicitud HTTP 
  //con sus detalles, como la URL, el método HTTP, las cabeceras y el cuerpo de la solicitud.
  HttpRequest,
  //HttpHandler: Esta clase maneja la solicitud HTTP y permite que la solicitud se propague a
  //través de la cadena de interceptores y, finalmente, se envíe al servidor.
  HttpHandler,
  //HttpEvent: Es una clase que representa un evento relacionado con una solicitud 
  //HTTP. Puede ser un evento de éxito (como la respuesta del servidor) o un evento de error (como un error HTTP).
  HttpEvent,
  //HttpInterceptor: Es una interfaz que se utiliza para crear interceptores HTTP personalizados en Angular. 
  //Los interceptores se utilizan para realizar acciones antes y después de que se envíen las solicitudes HTTP 
  //y después de recibir las respuestas.
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
// Importamos 'catchError', 'Observable' y 'throwError' de 'rxjs' para manejar errores en las secuencias de observables.

import { Router } from '@angular/router';
// Importamos 'Router' de '@angular/router' para realizar redirecciones de rutas en la aplicación.

import { ErrorService } from '../services/error.service';
// Importamos 'ErrorService' desde el archivo 'error.service' en la carpeta 'services' para manejar errores de la aplicación.

@Injectable()
// Marcamos la clase 'AddTokenInterceptor' como un servicio.

// significa que se utiliza para interceptar las solicitudes HTTP antes de que se envíen al servidor.
export class AddTokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private _errorService: ErrorService) {}
  // Constructor de la clase que recibe el servicio 'Router' y 'ErrorService' como dependencias.
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Antes de enviar la solicitud al servidor, podemos realizar acciones aquí
    const token = localStorage.getItem('token');
    // Obtenemos el token de autorización almacenado en el localStorage
    if (token) {
        // Si hay un token de autorización
        request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        // Agregamos el token como encabezado de autorización a la solicitud
    }
    // La solicitud ahora tiene el token de autorización agregado en caso de que exista
    // y luego se pasa al siguiente interceptor o al servidor.

    // También podríamos realizar más acciones aquí antes de que la solicitud se envíe al servidor.

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this._errorService.msjError(error);
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
  // Método 'intercept' que intercepta las solicitudes HTTP antes de ser enviadas y maneja los errores, especialmente el error 401 (no autorizado).
}
