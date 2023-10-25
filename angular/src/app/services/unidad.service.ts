import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UnidadService {
  private API_URL = 'http://localhost:3000/api/unidad';

  constructor(private http: HttpClient) { }

  // Obtiene la lista de unidades
  getUnidades(): Observable<any> {
    return this.http.get(`${this.API_URL}/lista`)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Obtiene detalles de una unidad por su ID
  getUnidad(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Crea una nueva unidad
  createUnidad(data: any): Observable<any> {
    return this.http.post(this.API_URL, data)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Actualiza una unidad existente
  updateUnidad(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, data)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Elimina una unidad por su ID
  deleteUnidad(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('Error en la solicitud:', error);
    const errorMessage = 'Error en la solicitud. Por favor, inténtalo de nuevo más tarde.';
    return of(errorMessage);
  }
}
