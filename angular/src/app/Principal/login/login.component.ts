import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/login.interface';
import { LoginResponse } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  rut_usuario: number | null = null; 
  clave_usuario: string = '';

  constructor(
    private toastr: ToastrService, 
    private _authService: AuthService, 
    private router: Router, 
    private _errorService: ErrorService 
  ) {}

  ngOnInit(): void {}

  login() {
    if ( this.rut_usuario === null || isNaN(this.rut_usuario) || this.clave_usuario == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
   
    const user: User = {
      rut_usuario: this.rut_usuario,
      clave_usuario: this.clave_usuario,
    };

    this._authService.login(user).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem('rol', response.rol.toString()); 
        this.redirectBasedOnRole(response.rol);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      }
    });
  }

  redirectBasedOnRole(rol: number) {
    switch (rol) {
      case 1:
        this.router.navigate(['/admin']);
        break;
      case 2:
        this.router.navigate(['/dac']); 
        break;
      case 3:
        this.router.navigate(['/comite']);
        break;
      case 4:
        this.router.navigate(['/responsable']);
        break;
      case 5:
        this.router.navigate(['/inicio']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}
