import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {
  
  
  private baseUrl = 'http://localhost:3000/api/facultad';

  constructor(private http: HttpClient) { }

  // Obtiene la lista de facultades
  getFacultades(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lista`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  // Crea un nueva facultad
  createFacultad(nombreFacultad: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { nombre_facultad: nombreFacultad })
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  // Obtiene detalles de una facultad por su ID
  getFacultad(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  // Actualiza una facultad existente
  updateFacultad(id: number, nombreFacultad: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, { nombre_facultad: nombreFacultad })
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  // Elimina una facultad por su ID
  deleteFacultad(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  buscarFacultad(searchTerm: string): Observable<any> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get(`${this.baseUrl}/buscar`, { params })
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
