import { UserService } from './../user.service';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'pr-register',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly routes = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly userService = inject(UserService);

  readonly registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(3)]],
    passwordGroup: this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validators: RegisterComponent.passwordMatch }
    ),
    birthYear: [1900 as number, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
  });

  readonly authenticationFailed = signal(false);

  get loginControl() {
    return this.registerForm.controls.login;
  }

  get passwordGroup() {
    return this.registerForm.controls.passwordGroup;
  }

  get passwordControl() {
    return this.passwordGroup.controls.password;
  }

  get confirmPasswordControl() {
    return this.passwordGroup.controls.confirmPassword;
  }

  get birthYearControl() {
    return this.registerForm.controls.birthYear;
  }

  static passwordMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { matchingError: true };
  }

  register() {
    if (this.registerForm.valid) {
      console.log('values : ', this.loginControl?.value, this.passwordControl?.value, this.birthYearControl?.value);
      this.userService
        .register(this.loginControl?.value as string, this.passwordControl?.value as string, this.birthYearControl?.value as number)
        .subscribe({
          next: () => this.routes.navigateByUrl('/'),
          error: () => this.authenticationFailed.set(true)
        });
    }
  }
}
