import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loginRequestAction } from 'src/app/core/store/actions/auth.actions';
import { selectErrorMessage } from 'src/app/core/store/selectors/auth.selectors';

@Component({
  selector: 'airways-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  errorMessage!: Observable<string | null | undefined>;

  hide = true;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.createLoginForm();

    this.errorMessage = this.store.select(selectErrorMessage);
  }

  onLogIn() {
    if (!this.loginForm.valid) {
      return;
    }
    const credentials = {
      email: this.email.value,
      password: this.password.value,
    };
    this.store.dispatch(loginRequestAction({ credentials }));
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  onForgotPassword() {
    alert('Then remember it ?!');
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required, Validators.minLength(8)] }],
    });
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }
}
