import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
export class LoginPageComponent {
  loginForm: FormGroup = new FormGroup({});

  matcher = new MyErrorStateMatcher();

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

  login() {
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
