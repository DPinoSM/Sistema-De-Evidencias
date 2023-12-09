import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from 'src/app/interfaces/usuario.interface';
import { Unidad } from 'src/app/interfaces/unidad.interface';
import { UnidadService } from 'src/app/services/unidad.service';
import { Rol } from 'src/app/interfaces/rol.interface';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css', '../../../shared-styles.css']
})
export class PerfilComponent implements OnInit {
  sideNavStatus: boolean = false;
  usuario: User | null = null;
  unidades: Unidad[] = [];
  roles: Rol[] = [];

  constructor(private usuarioService: UsuarioService,
    private unidadService: UnidadService, private rolService: RolService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.getRoles();
    this.getUnidades();
  }
  
  private obtenerUsuario(): void {
    const idUsuario = localStorage.getItem('id_usuario');
  
    if (idUsuario) {
      const id = +idUsuario;
      this.usuarioService.getUser(id).subscribe({
        next: (usuario) => {
          this.usuario = usuario;
          this.getRoles();
          this.getUnidades();
        },
        error: (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      });
    } else {
      console.error('ID de usuario no encontrada en el Local Storage.');
    }
  }
  

  getRoles() {
    this.rolService.getRoles().subscribe((roles) => {
        this.roles = roles;
    });
  }
  
  getUnidades() {
    this.unidadService.getUnidades().subscribe((unidades) => {
      this.unidades = unidades;
    });
  }
}
