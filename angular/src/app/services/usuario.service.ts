import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lista`)
      .pipe(catchError(err => this.handleError(err)));
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  newUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data)
      .pipe(catchError(err => this.handleError(err)));
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data)
      .pipe(catchError(err => this.handleError(err)));
  }


  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
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