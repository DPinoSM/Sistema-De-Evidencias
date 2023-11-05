import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() sideNavStatus: boolean = false;

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
      link: '/debilidades', 
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    
  }

  isItemVisible(item: any): boolean {
    switch (item.link) {
      case '/usuarios':
        return this.authService.checkRoleAndVisibility(1, [1]);
      case '/evidencias':
        return this.authService.checkRoleAndVisibility(5, [5]);
      case '/debilidades':
      case '/impacto':
      case '/graficos':
        return this.authService.checkRoleAndVisibility(2, [1, 2, 3, 4]);
      default:
        return true;
    }
  }
  
  
}
