import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/login.interface';
import { tap } from 'rxjs/operators';

export interface LoginResponse {
  id_usuario: number;
  token: string;
  rol: number;
  rut_usuario: number;
  correo_usuario: string;
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
          localStorage.setItem('id_usuario', response.id_usuario.toString());
          localStorage.setItem('token', response.token);
          localStorage.setItem('rol', response.rol.toString());
          localStorage.setItem('rut_usuario', response.rut_usuario.toString());
          localStorage.setItem('correo_usuario', response.correo_usuario);
        })
      );
  }

  // Nuevo método para obtener la información del usuario logeado
  getUsuarioLogeadoInfo(): { rut: number; correo: string; id: number } | null {
    const id = localStorage.getItem('id_usuario');
    const rut = localStorage.getItem('rut_usuario');
    const correo = localStorage.getItem('correo_usuario');
  
    if (rut !== null && correo !== null && id !== null) {
      return { rut: +rut, id: +id, correo: correo || '' }; 
    }
  
    return null;
  }
  

  
}
