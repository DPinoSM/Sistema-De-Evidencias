import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() sideNavStatus: boolean = false;

  list = [
    {
      name: 'Home',
      icon: 'fa-solid fa-house',
      link: '/admin', 
    },
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
      name: 'Informes',
      icon: 'fa-solid fa-file-alt',
      link: '/informes', 
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
    
  }
}
