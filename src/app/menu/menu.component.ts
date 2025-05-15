import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'pr-menu',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  readonly navbarCollapsed = signal(true);
  readonly user = this.userService.currentUser;

  toggleNavbar(): void {
    this.navbarCollapsed.update(isCollapsed => !isCollapsed);
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
