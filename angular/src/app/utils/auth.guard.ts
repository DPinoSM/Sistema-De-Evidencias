import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    const rol = Number(localStorage.getItem('rol'));
    if (token && !isNaN(rol)) {
      const requiredRole = route.data['rol'];
      if (!isNaN(requiredRole) && requiredRole === rol) {
        return true;
      } else {
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
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
