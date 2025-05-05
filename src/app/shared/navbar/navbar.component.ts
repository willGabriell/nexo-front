import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  username: string = '';
  userInitial: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') ?? '';
    this.userInitial = this.username?.charAt(0).toUpperCase() ?? '';
  }

  home() {
    this.router.navigate(['/dashboard'])
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
