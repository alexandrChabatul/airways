import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../../core/store/actions/auth.actions';

@Component({
  selector: 'airways-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  hide = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  onLogIn() {
    const credentials = {
      email: this.email.value,
      password: this.password.value,
    };
    this.store.dispatch(AuthActions.loginRequestAction({ credentials }));
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
