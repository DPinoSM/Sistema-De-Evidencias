import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  private ApiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.ApiUrl}/login`, user)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token); 
          localStorage.setItem('rol', response.rol.toString()); 
        })
      );
  }
}
