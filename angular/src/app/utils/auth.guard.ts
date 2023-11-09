import { Injectable } from '@angular/core';
// Importamos 'Injectable' de '@angular/core' para marcar la clase como un servicio que puede ser inyectado en otros componentes.

import { ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
// Importamos varias clases necesarias para crear un guardia de ruta, como 'ActivatedRouteSnapshot', 'RouterStateSnapshot', 'UrlTree' y 'Router'.

import { Observable } from 'rxjs';
// Importamos 'Observable' de 'rxjs' para trabajar con observables.

@Injectable({
  providedIn: 'root'
})
// Marcamos la clase 'AuthGuard' como un servicio que se proporcionará en la raíz de la aplicación.

export class AuthGuard {

  constructor(private router: Router) { }
  // Constructor de la clase que recibe el servicio 'Router' como dependencia.

  canActivate(
    //Esto te proporciona información sobre la ruta que el usuario intenta acceder, 
    //como los parámetros de la ruta, los datos de la ruta y otros detalles relacionados con la ruta actual.
    route: ActivatedRouteSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //manejar tanto lógica sincrónica como asincrónica. 
    //Puede devolver directamente true o false o una URL (UrlTree) para redirigir al usuario.


    const token = localStorage.getItem('token');
    const rol = Number(localStorage.getItem('rol'));
    // Se obtienen el token y el rol del usuario almacenados en el almacenamiento local.

    if (token && !isNaN(rol)) {
      // Si hay un token y el rol es un número válido.
      const requiredRole = route.data['rol'];
      // Se obtiene el rol requerido de los datos de la ruta.

      if (!isNaN(requiredRole) && requiredRole === rol) {
        return true;
        // Si el rol requerido coincide con el rol del usuario, se permite el acceso.
      } else {
        // Si el rol requerido no coincide con el rol del usuario, se redirige según el rol actual del usuario.
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
      // Si no hay token o el rol no es un número válido, se redirige al usuario a la página de inicio de sesión.
      this.router.navigate(['/login']);
    }
    return false;
    // Se devuelve 'false' para denegar el acceso.
  }
}
