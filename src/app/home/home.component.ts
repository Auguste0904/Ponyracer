import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly userService = inject(UserService);
  readonly user = this.userService.currentUser;
}
