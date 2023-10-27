
import { Component, OnInit } from '@angular/core';
import { RolService } from '../../services/rol.service';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listarol',
  templateUrl: './listarol.component.html',
  styleUrls: ['./listarol.component.css','../../../shared-styles.css']
})
export class ListarolComponent implements OnInit {
  roles: any[] = [];
  newRolData: any;
  private rolesSubscription!: Subscription;
  sideNavStatus: boolean = false;

  constructor(private rolService: RolService, private toastr: ToastrService) {
    this.newRolData = {
      id_rol: '',
      nombre_rol: '',
    };
  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    if (this.rolesSubscription) {
      this.rolesSubscription.unsubscribe();
    }
    this.rolesSubscription = this.rolService.getRoles()
      .pipe(
        catchError(error => {
          console.error('Error al obtener roles:', error);
          return [];
        })
      )
      .subscribe((data: any) => {
        this.roles = data;
      });
  }

  eliminarRol(id: number) {
    this.rolService.deleteRol(id).subscribe(() => {
      this.getRoles();
      this.toastr.warning('El rol fue eliminado con éxito', 'Rol eliminado');
    });
  }
}
