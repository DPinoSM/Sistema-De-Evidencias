import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/login.interface'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users'
   }
   
   login(user: User): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
   }
}
