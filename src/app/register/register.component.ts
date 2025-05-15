import { Component, inject, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { BirthYearInputComponent } from '../birth-year-input/birth-year-input.component';

@Component({
  imports: [ReactiveFormsModule, BirthYearInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  readonly registrationFailed = signal(false);
  readonly loginCtrl = this.fb.control('', [Validators.required, Validators.minLength(3)]);
  readonly passwordCtrl = this.fb.control('', Validators.required);
  readonly confirmPasswordCtrl = this.fb.control('', Validators.required);
  readonly birthYearCtrl = this.fb.control<number | null>(null, [Validators.required]);
  readonly passwordGroup = this.fb.group(
    {
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    },
    {
      validators: RegisterComponent.passwordMatch
    }
  );
  readonly userForm = this.fb.group({
    login: this.loginCtrl,
    passwordForm: this.passwordGroup,
    birthYear: this.birthYearCtrl
  });

  static passwordMatch(control: AbstractControl<{ password: string; confirmPassword: string }>): ValidationErrors | null {
    const password = control.value.password;
    const confirmPassword = control.value.confirmPassword;
    return password !== confirmPassword ? { matchingError: true } : null;
  }

  register(): void {
    this.registrationFailed.set(false);
    const {
      login,
      passwordForm: { password },
      birthYear
    } = this.userForm.getRawValue();
    this.userService.register(login, password, birthYear!).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => this.registrationFailed.set(true)
    });
  }
}
