import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import passwordValidator from './validators/password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'airways-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});

  hide = true;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.addSvgIcon('google');
    this.addSvgIcon('facebook');

    this.createLoginForm();
  }

  addSvgIcon(iconName: string) {
    this.iconRegistry.addSvgIcon(
      iconName,
      this.sanitizer.bypassSecurityTrustResourceUrl(`../../../../assets/icons/${iconName}.svg`),
    );
  }

  onGoogleSignIn() {}

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
          validators: [Validators.required, passwordValidator],
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

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'The login email is invalid' : '';
  }

  login() {
    if (this.email.valid) {
      // this.loginService.login(this.email.value ?? '');
      // this.router.navigate(['']);
    }
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
