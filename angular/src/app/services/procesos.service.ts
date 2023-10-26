import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Proceso } from '../interfaces/procesos';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {
  private baseUrl = 'http://localhost:3000/api/proceso/';
  
  constructor(private http: HttpClient) {}

  getListProcesos(): Observable<Proceso[]> {
    return this.http.get<Proceso[]>(`${this.baseUrl}lista`);
  }

  getProceso(id: number): Observable<Proceso> {
    return this.http.get<Proceso>(`${this.baseUrl}${id}`);
  }

  createProceso(proceso: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, proceso).pipe(catchError(err => this.handleError(err)));
  }

  updateProceso(id: number, procesoData: any): Observable<any>{
    return this.http.put(`${this.baseUrl}${id}`, procesoData);
  }

  deleteProceso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
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
