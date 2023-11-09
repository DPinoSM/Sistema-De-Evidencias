import { Injectable } from '@angular/core';
// Importamos 'Injectable' de '@angular/core' para marcar la clase como un servicio que puede ser inyectado en otros componentes.

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
// Importamos 'HttpClient' de '@angular/common/http' para realizar solicitudes HTTP.
// Importamos 'HttpErrorResponse' para manejar errores de HTTP.
// Importamos 'HttpParams' para manejar parámetros de URL en las solicitudes HTTP.

import { Observable, throwError } from 'rxjs';
// Importamos 'Observable' y 'throwError' de 'rxjs' para trabajar con secuencias de observables y manejo de errores.
import { catchError } from 'rxjs/operators';
// Importamos 'catchError' de 'rxjs/operators' para manejar errores en las secuencias de observables.

//Un Observable es una secuencia de valores o eventos que ocurren a lo largo del tiempo

@Injectable({
  providedIn: 'root'
})

// Marcamos la clase 'AmbitoAService' como un servicio que se proporcionará en la raíz de la aplicación.
export class AmbitoAService {
  private apiUrl = 'http://localhost:3000/api/ambitoacademico';
  // Definimos la URL base del servicio al que se realizarán las solicitudes.

  constructor(private http: HttpClient) {}
  // Constructor de la clase que inyecta el servicio 'HttpClient' para realizar solicitudes HTTP.

  getAmbitosAcademicos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lista`)
    .pipe(catchError(this.handleError));
  }
  // Método que realiza una solicitud GET para obtener una lista de ámbitos académicos.

  newAmbitoAcademico(ambitoData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, ambitoData)
    .pipe(catchError(this.handleError));
  }
  // Método que realiza una solicitud POST para crear un nuevo ámbito académico.

  getAmbitoAcademico(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }
  // Método que realiza una solicitud GET para obtener un ámbito académico por su ID.

  updateAmbitoAcademico(id: number, ambitoData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ambitoData)
    .pipe(catchError(this.handleError));
  }
  // Método que realiza una solicitud PUT para actualizar un ámbito académico existente.

  deleteAmbitoAcademico(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }
  // Método que realiza una solicitud DELETE para eliminar un ámbito académico por su ID.

  buscarAmbitoAca(searchTerm: string): Observable<any> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get(`${this.apiUrl}/buscar`, { params })
      .pipe(catchError(err => this.handleError(err)));
  }
  // Método que realiza una solicitud GET con parámetros para buscar ámbitos académicos.

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
    // Manejo de errores de HTTP, registrando el error en la consola.

    let errorMessage = 'Error en la solicitud. Por favor, inténtalo de nuevo más tarde.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del lado del cliente: ${error.error.message}`;
    } else if (error.status === 404) {
      errorMessage = 'No se encontró el recurso solicitado.';
    } else if (error.status === 500) {
      errorMessage = 'Error del servidor interno. Por favor, inténtalo más tarde.';
    }
    // Determinación del mensaje de error en función del tipo de error.

    return throwError(() => errorMessage);
  }
  // Método que maneja los errores de HTTP y devuelve un observable con un mensaje de error.
}
