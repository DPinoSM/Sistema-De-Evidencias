import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CriterioService {

  private apiUrl = 'http://localhost:3000/api/criterio';

  constructor(private http: HttpClient) { }

  getCriterios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lista`)
      .pipe(catchError(err => this.handleError(err)));
  }

  createCriterio(criterioData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, criterioData)
      .pipe(catchError(err => this.handleError(err)));
  }

  getCriterioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  updateCriterio(id: number, criterioData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, criterioData)
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteCriterio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  buscarCriterio(searchTerm: string): Observable<any> {
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
