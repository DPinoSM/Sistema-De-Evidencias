import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/login.interface'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ApiUrl: string;
  private ApiiUrl: string;

  constructor(private http: HttpClient) {
    this.ApiUrl = environment.endpoint;
    this.ApiiUrl = 'api/users'
   }
   
   login(user: User): Observable<User> {
    return this.http.post<User>(`${this.ApiUrl}${this.ApiiUrl}/login`, user);
   }
}
