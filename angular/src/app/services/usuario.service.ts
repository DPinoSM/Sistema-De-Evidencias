import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lista`)
      .pipe(catchError(err => this.handleError(err)));
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  newUser(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data)
      .pipe(catchError(err => this.handleError(err)));
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data)
      .pipe(catchError(err => this.handleError(err)));
  }


  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('Error en la solicitud:', error);
    console.error('Estado HTTP:', error.status);
    console.error('Mensaje de error:', error.message);
    return of('Error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
  }
}