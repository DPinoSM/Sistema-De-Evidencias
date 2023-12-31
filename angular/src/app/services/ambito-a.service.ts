import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AmbitoAService {
  private apiUrl = 'http://localhost:3000/api/ambitoacademico';

  constructor(private http: HttpClient) {}

  getAmbitosAcademicos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lista`)
    .pipe(catchError(this.handleError));
  }
  // Método que realiza una solicitud GET para obtener una lista de ámbitos académicos.

  newAmbitoAcademico(ambitoData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, ambitoData)
    .pipe(catchError(this.handleError));
  }
  // Método que realiza una solicitud POST para crear un nuevo ámbito académico.

  getAmbitoAcademico(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }
  // Método que realiza una solicitud GET para obtener un ámbito académico por su ID.

  updateAmbitoAcademico(id: number, ambitoData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ambitoData)
    .pipe(catchError(this.handleError));
  }
  // Método que realiza una solicitud PUT para actualizar un ámbito académico existente.

  deleteAmbitoAcademico(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }
  // Método que realiza una solicitud DELETE para eliminar un ámbito académico por su ID.

  buscarAmbitoAca(searchTerm: string): Observable<any> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get(`${this.apiUrl}/buscar`, { params })
      .pipe(catchError(err => this.handleError(err)));
  }
  // Método que realiza una solicitud GET con parámetros para buscar ámbitos académicos.

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
