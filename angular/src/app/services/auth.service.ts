import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/login.interface';
import { tap } from 'rxjs';

export interface LoginResponse {
  token: string;
  rol: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ApiUrl: string;
  private ApiiUrl: string;

  constructor(private http: HttpClient) {
    this.ApiUrl = environment.endpoint;
    this.ApiiUrl = '/api/users';
  }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.ApiUrl}${this.ApiiUrl}/login`, user)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token); 
          localStorage.setItem('rol', response.rol.toString()); 
        })
      );
  }
}
