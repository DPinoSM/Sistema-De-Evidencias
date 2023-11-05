import { Component, OnInit } from '@angular/core';;
import { AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/login.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  hide = true;
  rut_usuario: string = '';
  clave_usuario: string = '';

  constructor( private toastr: ToastrService,
    private _errorService: ErrorService,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  login() {

    // Validamos que el usuario ingrese datos
    if (this.rut_usuario == '' || this.clave_usuario == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    // Creamos el body
    const user: User = {
      rut_usuario: this.rut_usuario,
      clave_usuario: this.clave_usuario
    }

    this.loading = true;
    this._authService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/admin'])
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false
      }
    })
  }

  

}
