import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {
  private baseUrl = 'http://localhost:3000/api/proceso/';
  
  constructor(private http: HttpClient) {}

  getProcesos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}lista`);
  }

  createProceso(procesoData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, procesoData)
        .pipe(catchError(err => this.handleError(err)));
  }

  getProcesoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${id}`)
        .pipe(catchError(err => this.handleError(err)));
  }

  updateProceso(id: number, procesoData: any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}${id}`, procesoData)
        .pipe(catchError(err => this.handleError(err)));
  }

  deleteProceso(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${id}`)
        .pipe(catchError(err => this.handleError(err)));
  }

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
