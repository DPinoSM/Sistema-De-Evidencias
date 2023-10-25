import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  // Función para crear un usuario
  createUser(usuarioData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, usuarioData).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Función para obtener la lista de usuarios
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lista`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Función para actualizar un usuario
  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, userData).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Función para eliminar un usuario
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Función para obtener un usuario por ID
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    return throwError(() => 'Ocurrió un error. Por favor, inténtelo de nuevo.');
  }
}
