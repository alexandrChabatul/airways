import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomDateValidator {
  actualDateValidation(control: AbstractControl<string>): ValidationErrors | null {
    return Date.parse(control.value) < Date.now() ? { invalidDate: true } : null;
  }
}
