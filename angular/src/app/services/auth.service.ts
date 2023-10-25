import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface LoginResponse {
  msg: string;
  token?: string;
  role?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users/login';
  private authToken: string | null = null;
  private userRole: number | null = null;

  constructor(private http: HttpClient) {}

  login(rut: string, password: string): Observable<LoginResponse> {
    const loginData = { rut_usuario: rut, clave_usuario: password };
    return this.http.post<LoginResponse>(`${this.apiUrl}`, loginData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del lado del cliente: ${error.error.message}`;
    } else if (error.status === 401) {
      errorMessage = 'Usuario o contraseña incorrectos';
    } else if (error.status === 403) {
      errorMessage = 'Acceso no autorizado';
    } else {
      errorMessage = 'Error desconocido. Por favor, inténtalo de nuevo.';
    }

    return throwError(() => errorMessage);
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  getUserRole(): number | null {
    return this.userRole;
  }

  clearAuthData() {
    this.authToken = null;
    this.userRole = null;
  }
}
