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
  userService = inject(UserService);
  routes = inject(Router);
  formBuilder = inject(FormBuilder);

  readonly authenticationFailed = signal(false);

  form = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  get loginControl() {
    return this.form.get('login');
  }

  get passwordControl() {
    return this.form.get('password');
  }

  authenticate() {
    if (
      this.loginControl?.value !== null &&
      this.loginControl?.value !== undefined &&
      this.passwordControl?.value !== null &&
      this.passwordControl?.value !== undefined
    ) {
      this.userService.authenticate(this.loginControl?.value, this.passwordControl?.value).subscribe({
        next: () => this.routes.navigateByUrl('/'),
        error: () => this.authenticationFailed.set(true)
      });
    }
  }
}
