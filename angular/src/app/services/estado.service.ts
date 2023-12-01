import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class EstadoService {
  private baseUrl = 'http://localhost:3000/api/estado';

  constructor(private http: HttpClient) {}

  // Método para obtener todas las evidencias desde el backend
  obtenerEstado(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lista`)
        .pipe(
            catchError(err => this.handleError(err))
        );
}
  
  nuevoEstado(online_presencial: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, {online_presencial: online_presencial})
    .pipe(
      catchError(err => this.handleError(err))
      );
  }

  // Método para obtener una evidencia específica por su ID desde el backend
  obtenerEstadoPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
    .pipe(
      catchError(err => this.handleError(err))
      );
  }

  actualizarEstado(id: number, online_presencial: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, { online_presencial: online_presencial})
    .pipe(
      catchError(err => this.handleError(err))
      );
  }

  eliminarEstado(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
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
    } else if (error.error && error.error.msg) {
        errorMessage = error.error.msg;  
    } else if (error.status === 400 && error.error.errors) {
        
        console.error('Detalles de errores de validación:', error.error.errors);
    } else if (error.status === 404) {
        errorMessage = 'No se encontró el recurso solicitado.';
    } else if (error.status === 500) {
        errorMessage = 'Error del servidor interno. Por favor, inténtalo más tarde.';
    }

    return throwError(() => errorMessage);
  }
}


