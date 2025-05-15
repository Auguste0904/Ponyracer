import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'pr-menu',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  readonly navbarCollapsed = signal(true);
  readonly userService = inject(UserService);
  readonly user = this.userService.currentUser;
  private readonly router = inject(Router);

  toggleNavbar(): void {
    this.navbarCollapsed.update(isCollapsed => !isCollapsed);
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
