import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'pr-birth-year-input',
  templateUrl: './birth-year-input.component.html',
  styleUrl: './birth-year-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BirthYearInputComponent),
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => BirthYearInputComponent), multi: true }
  ]
})
export class BirthYearInputComponent implements ControlValueAccessor, Validator {
  readonly inputId = input.required<string>();
  readonly value = signal<number | null>(null);
  readonly year = computed(() => this.computeYear());
  onChange: (value: number | null) => void = () => {};
  onTouched: () => void = () => {};
  readonly disabled = signal(false);

  writeValue(value: number | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onBirthYearChange(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    if (isNaN(value)) {
      this.value.set(null);
    } else {
      this.value.set(value);
    }
    this.onChange(this.year());
  }

  private computeYear(): number | null {
    const lastTwoDigitsOfTheCurrentYear = new Date().getFullYear() % 100;
    const firstTwoDigitsOfTheCurrentYear = Math.floor(new Date().getFullYear() / 100);

    const value = this.value();
    if (value === null) {
      return null;
    } else if (value < 0 || value > 100) {
      return value;
    } else if (value > lastTwoDigitsOfTheCurrentYear) {
      return (firstTwoDigitsOfTheCurrentYear - 1) * 100 + value;
    } else {
      return firstTwoDigitsOfTheCurrentYear * 100 + value;
    }
  }

  validate(control: AbstractControl<number | null>): ValidationErrors | null {
    const year = control.value;
    if (year === null) {
      return null;
    } else if (year < 1900 || year > new Date().getFullYear()) {
      return { invalidYear: true };
    }
    return null;
  }
}
