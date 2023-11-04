import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {

  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
    
    const url = state.url;

    const expectedRole = route.data['expectedRole'];

    if (this.authService.isAuthenticated() && this.authService.getUserRole() === expectedRole) {
      return true; // El usuario tiene el rol adecuado, permitir el acceso
    } else {
      this.router.navigate(['/login']); // Redirigir al usuario a la página de inicio de sesión si no tiene el rol necesario
      return false;
    }
  }
}
