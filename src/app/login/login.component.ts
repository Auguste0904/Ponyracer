import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  readonly credentials = inject(NonNullableFormBuilder).group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });
  readonly authenticationFailed = signal(false);

  authenticate(): void {
    this.authenticationFailed.set(false);
    const { login, password } = this.credentials.getRawValue();
    this.userService.authenticate(login, password).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => this.authenticationFailed.set(true)
    });
  }
}
