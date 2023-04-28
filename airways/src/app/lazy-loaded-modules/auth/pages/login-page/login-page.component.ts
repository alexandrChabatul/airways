import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'airways-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  matcher = new MyErrorStateMatcher();

  hide = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required],
        },
      ],
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
