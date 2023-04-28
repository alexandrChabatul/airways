import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'airways-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  hide = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createLoginForm();
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

  onLogin() {
    if (this.email.valid) {
      // this.loginService.login(this.email.value ?? '');
      // this.router.navigate(['']);
    }
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  onForgotPassword() {
    alert('Then remember it ?!');
  }
}
