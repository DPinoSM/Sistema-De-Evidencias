import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginResponse } from '../../../services/auth.service';
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
      RUT: ['', Validators.required],
      password: ['', Validators.required],
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
      const { RUT, password } = this.f;
      this.authService.login(RUT.value, password.value).subscribe({
        next: (data: LoginResponse | undefined) => {
          if (data) {
            if (data.token) {
              localStorage.setItem('authToken', data.token);
              if (data.role) {
                console.log('Rol del usuario:', data.role);
                this.onLoginSuccess(data.role);
              }
            } else {
              this.error = data.msg || 'Error inesperado en el inicio de sesión';
            }
          } else {
            // Manejo de otro tipo de datos.
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

  onLoginSuccess(role: number | undefined) {
    if (role === 1) {
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
