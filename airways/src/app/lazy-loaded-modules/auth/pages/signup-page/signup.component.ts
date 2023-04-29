import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SvgIconService } from 'src/app/core/services/svg-icon.service';

@Component({
  selector: 'airways-signup-page',
  templateUrl: './signup-page.component.html',
})
export class SignupPageComponent implements OnInit {
  signupForm!: FormGroup;

  hide = true;

  maxDate: Date = new Date();

  constructor(private formBuilder: FormBuilder, private svgIconService: SvgIconService) {
    this.svgIconService.addSvgIcon('info');
  }

  ngOnInit(): void {
    this.createSignupForm();
  }

  createSignupForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required, Validators.minLength(8)] }],
      firstName: ['', { validators: [Validators.required] }],
      lastName: ['', { validators: [Validators.required] }],
      dateOfBirth: ['', { validators: [Validators.required] }],
      gender: ['', { validators: [Validators.required] }],
    });
  }

  get email() {
    return this.signupForm.controls['email'];
  }

  get password() {
    return this.signupForm.controls['password'];
  }

  get firstName() {
    return this.signupForm.controls['firstName'];
  }

  get lastName() {
    return this.signupForm.controls['lastName'];
  }

  get dateOfBirth() {
    return this.signupForm.controls['dateOfBirth'];
  }

  get gender() {
    return this.signupForm.controls['gender'];
  }

  onSignup() {
    if (this.email.valid) {
      // this.loginService.login(this.email.value ?? '');
      // this.router.navigate(['']);
    }
  }
}
