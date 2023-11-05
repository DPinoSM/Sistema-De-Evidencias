import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginResponse } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error = '';
  submitted = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      rut_usuario: ['', Validators.required],
      clave_usuario: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.error = 'Por favor, complete todos los campos requeridos.';
      return;
    }

    this.loading = true;
    this.login();
  }

  async login() {
    try {
      const { rut_usuario, clave_usuario } = this.f;
      this.authService.login(rut_usuario.value, clave_usuario.value).subscribe({
        next: (data: LoginResponse | undefined) => {
          if (data) {
            if (data.token) {
              localStorage.setItem('authToken', data.token);
              if (data.id_rol) {
                console.log('Rol del usuario:', data.id_rol);
                this.onLoginSuccess(data.id_rol);
              }
            } else {
              this.error = data.msg || 'Error inesperado en el inicio de sesión';
            }
          } else {
          }
        },
        error: (error: any) => {
          this.handleError(error);
        }
      });
      
    } catch (error) {
      this.handleError(error);
    } finally {
      this.loading = false;
    }
  }

  onLoginSuccess(id_rol: number | undefined) {
    if (id_rol === 1) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/inicio']);
    }
  }
  
  handleError(error: any) {
    if (error.status === 401) {
      this.error = 'Usuario o contraseña incorrectos';
    } else {
      this.error = 'Error en el inicio de sesión, intente más tarde';
    }
  }

  toggleHide() {
    this.hide = !this.hide;
  }
}
