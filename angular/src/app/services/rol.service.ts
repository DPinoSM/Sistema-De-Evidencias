import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private baseUrl = 'http://localhost:3000/api/roles';

  constructor(private http: HttpClient) { }

  // Obtiene la lista de roles
  getRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lista`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  // Crea un nuevo rol
  createRol(nombreRol: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { nombre_rol: nombreRol })
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  // Obtiene detalles de un rol por su ID
  getRol(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  // Actualiza un rol existente
  updateRol(id: number, nombreRol: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, { nombre_rol: nombreRol })
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  // Elimina un rol por su ID
  deleteRol(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud:', error);
    return 'Error en la solicitud. Por favor, inténtalo de nuevo más tarde.';
  }
}
