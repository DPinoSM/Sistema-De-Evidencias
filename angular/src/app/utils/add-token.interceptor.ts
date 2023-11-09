import { Injectable } from '@angular/core';
// Importamos 'Injectable' de '@angular/core' para marcar la clase como un servicio que puede ser inyectado en otros componentes.

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
// Importamos varias clases necesarias para crear un interceptor HTTP, como 'HttpRequest', 'HttpHandler', 'HttpEvent' y 'HttpInterceptor'.

import { catchError, Observable, throwError } from 'rxjs';
// Importamos 'catchError', 'Observable' y 'throwError' de 'rxjs' para manejar errores en las secuencias de observables.

import { Router } from '@angular/router';
// Importamos 'Router' de '@angular/router' para realizar redirecciones de rutas en la aplicación.

import { ErrorService } from '../services/error.service';
// Importamos 'ErrorService' desde el archivo 'error.service' en la carpeta 'services' para manejar errores de la aplicación.

@Injectable()
// Marcamos la clase 'AddTokenInterceptor' como un servicio.

export class AddTokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private _errorService: ErrorService) {}
  // Constructor de la clase que recibe el servicio 'Router' y 'ErrorService' como dependencias.

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    // Interceptor que agrega el token de autorización a las cabeceras de la solicitud si existe en el almacenamiento local.

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
