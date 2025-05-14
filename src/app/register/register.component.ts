import { UserService } from './../user.service';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'pr-register',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly routes = inject(Router);

  readonly userForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(3)]],
    passwordGroup: this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validators: RegisterComponent.passwordMatch }
    ),
    birthYear: [null as number | null, Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]
  });

  readonly authenticationFailed = signal(false);

  get loginControl() {
    return this.userForm.controls.login;
  }

  get passwordGroup() {
    return this.userForm.controls.passwordGroup;
  }

  get passwordControl() {
    return this.passwordGroup.controls['password'];
  }

  get confirmPasswordControl() {
    return this.passwordGroup.controls['confirmPassword'];
  }

  get birthYearControl() {
    return this.userForm.controls.birthYear;
  }

  static passwordMatch(password: string, confirmPassword: string): ValidationErrors | null {
    return password === confirmPassword ? null : { matchingError: true };
  }

  register() {
    if (this.userForm.valid) {
      this.userService
        .register(this.loginControl?.value as string, this.passwordControl?.value as string, this.birthYearControl?.value as number)
        .pipe(takeUntilDestroyed())
        .subscribe({
          next: () => this.routes.navigateByUrl('/'),
          error: () => this.authenticationFailed.set(true)
        });
    }
  }
}
