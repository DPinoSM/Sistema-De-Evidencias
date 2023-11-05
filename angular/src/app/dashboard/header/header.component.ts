import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() SideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router) {
    //this.isAdmin = this.authService.checkIsAdmin();
  }

  ngOnInit(): void {
  }

  SideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.SideNavToggled.emit(this.menuStatus);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}
