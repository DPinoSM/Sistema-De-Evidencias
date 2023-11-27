import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class DacService {
  private baseUrl = 'http://localhost:3000/api/dac';

  constructor(private http: HttpClient) {}

  nuevaDac(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data)
    .pipe(
      catchError(err => this.handleError(err))
      );
  }

  // Método para obtener todas las evidencias desde el backend
  obtenerDac(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lista`)
    .pipe(
      catchError(err => this.handleError(err))
      );
  }

  // Método para obtener una evidencia específica por su ID desde el backend
  obtenerDacPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
    .pipe(
      catchError(err => this.handleError(err))
      );
  }

  // Método para eliminar una evidencia por su ID desde el backend
  eliminarDac(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
    .pipe(
      catchError(err => this.handleError(err))
      );
  }

  // Método para actualizar una evidencia por su ID en el backend
  actualizarDac(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data)
    .pipe(
      catchError(err => this.handleError(err))
      );
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
