import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() sideNavStatus: boolean = false;
  userRole: number = 0;

  list = [
    {
      name: 'Usuarios',
      icon: 'fa-solid fa-user',
      link: '/usuarios',
    },
    {
      name: 'Evidencias',
      icon: 'fa-solid fa-file-alt',
      link: '/evidencias',
    },
    {
      name: 'Debilidades',
      icon: 'fa-solid fa-exclamation-circle',
      link: '/debilidad',
    },
    {
      name: 'Impacto',
      icon: 'fa-solid fa-chart-area',
      link: '/impacto',
    },
    {
      name: 'Gráficos',
      icon: 'fa-solid fa-chart-bar',
      link: '/graficos',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    const storedUserRole = localStorage.getItem('rol');
    if (storedUserRole) {
      this.userRole = parseInt(storedUserRole, 10);
    }
  }

  isItemVisible(item: any): boolean {
    if (item.link === '/usuarios') {
      // Cambia la ruta y el nombre en función del rol del usuario.
      item.link = this.userRole === 1 ? '/usuarios' : '/perfil';
      item.name = this.userRole === 1 ? 'Usuarios' : 'Perfil';
    }
    return [1, 2, 3, 4, 5].includes(this.userRole);
  }
  
  
  
  
  
  
  
}
