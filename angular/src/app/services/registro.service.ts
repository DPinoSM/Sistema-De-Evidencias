import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private apiUrl = 'http://localhost:3000/api/registro';

  constructor(private http: HttpClient) { }

  // Obtiene la lista de registros
  getRegistros(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lista`)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Crea un nuevo registro
  createRegistro(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, data)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Actualiza un registro existente por su ID
  updateRegistro(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Obtiene detalles de un registro por su ID
  getRegistroById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Elimina un registro por su ID
  deleteRegistro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
  
    let errorMessage = 'Error en la solicitud. Por favor, inténtalo de nuevo más tarde.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del lado del cliente: ${error.error.message}`;
    } else if (error.status === 404) {
      errorMessage = 'No se encontró el recurso solicitado.';
    } else if (error.status === 500) {
      errorMessage = 'Error del servidor interno. Por favor, inténtalo más tarde.';
    }
  
    return throwError(() => errorMessage);
  }
}
