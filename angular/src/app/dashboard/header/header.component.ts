import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() SideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  userRole: number = 0; 

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUserRole = localStorage.getItem('rol');
    if (storedUserRole) {
      this.userRole = parseInt(storedUserRole, 10);
    }
  }

  SideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.SideNavToggled.emit(this.menuStatus);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
