import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent {
  public isMenuOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public isLogged() {
    return this.authService.isAuthenticated();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}