import { Component, signal } from '@angular/core';

@Component({
  selector: 'pr-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  navbarCollapsed = signal(true);

  toggleNavbar() {
    this.navbarCollapsed.set(!this.navbarCollapsed());
  }
}
