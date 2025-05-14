import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly userService = inject(UserService);
  private readonly routes = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });
  readonly authenticationFailed = signal(false);

  get loginControl() {
    return this.form.controls.login;
  }

  get passwordControl() {
    return this.form.controls.password;
  }

  authenticate() {
    if (this.form.valid) {
      this.userService.authenticate(this.loginControl?.value as string, this.passwordControl?.value as string).subscribe({
        next: () => this.routes.navigateByUrl('/'),
        error: () => this.authenticationFailed.set(true)
      });
    }
  }
}
