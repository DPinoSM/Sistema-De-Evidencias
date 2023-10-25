import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CriterioService {

  private apiUrl = 'http://localhost:3000/api/criterio';

  constructor(private http: HttpClient) { }

  // Obtiene la lista de criterios
  getCriterios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lista`)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Crea un nuevo criterio
  createCriterio(criterioData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, criterioData)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Obtiene un criterio por su ID
  getCriterioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Actualiza un criterio existente por su ID
  updateCriterio(id: number, criterioData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, criterioData)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Elimina un criterio por su ID
  deleteCriterio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error:', error);

    let errorMessage = 'Ocurrió un error';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del lado del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error del lado del servidor: ${error.status} - ${error.error}`;
    }

    // Devuelve un error observable con el mensaje de error
    return throwError(() => errorMessage);
  }
}
