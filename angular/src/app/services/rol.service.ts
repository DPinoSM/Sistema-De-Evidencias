import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private apiUrl = 'http://localhost:3000/api/roles';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lista`)
      .pipe(catchError(err => this.handleError(err)));
  }

  createRol(nombreRol: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { nombre_rol: nombreRol })
      .pipe(catchError(err => this.handleError(err)));
  }

  getRol(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  updateRol(id: number, nombreRol: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { nombre_rol: nombreRol })
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteRol(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  buscarRol(searchTerm: string): Observable<any> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get(`${this.apiUrl}/buscar`, { params })
      .pipe(catchError(err => this.handleError(err)));
  }


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