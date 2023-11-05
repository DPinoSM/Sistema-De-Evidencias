import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css', '../../../shared-styles.css']
})
export class InicioComponent {
  sideNavStatus: boolean = false;
}
