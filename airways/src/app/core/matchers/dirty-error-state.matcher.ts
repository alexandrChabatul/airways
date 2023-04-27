import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class DirtyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (form?.errors && form.errors['formSubmit']) {
      control?.markAllAsTouched();
    }
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
