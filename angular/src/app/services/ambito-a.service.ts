import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AmbitoAService {
  private backendUrl = 'http://localhost:3000/api/ambitoacademico';

  constructor(private http: HttpClient) {}

  // Obtiene la lista de ámbitos académicos.
  getAmbitosAcademicos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/lista`).pipe(
      catchError(this.handleError)
    );
  }

  // Crea un nuevo ámbito académico.
  newAmbitoAcademico(ambitoData: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}`, ambitoData).pipe(
      catchError(this.handleError)
    );
  }

  // Obtiene un ámbito académico por su ID.
  getAmbitoAcademico(id: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Actualiza un ámbito académico existente por su ID.
  updateAmbitoAcademico(id: number, ambitoData: any): Observable<any> {
    return this.http.put<any>(`${this.backendUrl}/${id}`, ambitoData).pipe(
      catchError(this.handleError)
    );
  }

  // Elimina un ámbito académico por su ID.
  deleteAmbitoAcademico(id: number): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método privado para manejar errores de la respuesta HTTP.
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
