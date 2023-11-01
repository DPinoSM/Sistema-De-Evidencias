import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {
  private apiUrl = 'http://localhost:3000/api/proceso/';
  
  constructor(private http: HttpClient) {}

  getProcesos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}lista`)
      .pipe(catchError(err => this.handleError(err)));
  }

  createProceso(procesoData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, procesoData)
        .pipe(catchError(err => this.handleError(err)));
  }

  getProcesoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`)
        .pipe(catchError(err => this.handleError(err)));
  }

  updateProceso(id: number, procesoData: any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}${id}`, procesoData)
        .pipe(catchError(err => this.handleError(err)));
  }

  deleteProceso(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}`)
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
