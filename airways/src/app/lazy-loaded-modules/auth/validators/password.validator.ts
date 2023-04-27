import { AbstractControl, ValidationErrors } from '@angular/forms';

export default function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const errors: ValidationErrors = {};
  const password = control.value as string;

  if (password.length < 8) {
    errors['minLength'] = 'Password must be at least 8 characters long.';
  }
  if (!/[A-Z]/.test(password)) {
    errors['uppercase'] = 'Password must contain at least one uppercase letter.';
  }
  if (!/[a-z]/.test(password)) {
    errors['lowercase'] = 'Password must contain at least one lowercase letter.';
  }
  if (!/\d/.test(password)) {
    errors['digit'] = 'Password must contain at least one digit.';
  }
  if (!/\W/.test(password)) {
    errors['specialChar'] = 'Password must contain at least one special character.';
  }
  return Object.keys(errors).length ? errors : null;
}
