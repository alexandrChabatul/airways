import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { SvgIconService } from 'src/app/core/services/svg-icon.service';
import { COUNTRY_CODES } from '../../constants/country-codes.constants';

@Component({
  selector: 'airways-signup-page',
  templateUrl: './signup-page.component.html',
})
export class SignupPageComponent implements OnInit {
  signupForm!: FormGroup;

  hide = true;

  maxDate: Date = new Date();

  codes!: string[];

  countries!: string[];

  filteredCountryCodes!: Observable<string[]>;

  filteredCountries!: Observable<string[]>;

  constructor(private formBuilder: FormBuilder, private svgIconService: SvgIconService) {
    this.svgIconService.addSvgIcon('info');
  }

  ngOnInit(): void {
    this.createSignupForm();

    this.countries = COUNTRY_CODES.map((country) => country.name);

    this.codes = COUNTRY_CODES.map(
      (country) => (country.name = country.name + ' (' + country.dial_code + ')'),
    );

    this.filteredCountryCodes = this.country.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCodes(value || '')),
    );

    this.filteredCountries = this.citizenship.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCountries(value || '')),
    );
  }

  private _filterCodes(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.codes
      .filter((country) => country.toLowerCase().includes(filterValue))
      .map((country) => country);
  }

  private _filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countries
      .filter((country) => country.toLowerCase().includes(filterValue))
      .map((country) => country);
  }

  onSignup() {
    if (this.email.valid) {
      // this.loginService.login(this.email.value ?? '');
      // this.router.navigate(['']);
    }
  }

  createSignupForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required, Validators.minLength(8)] }],
      firstName: ['', { validators: [Validators.required] }],
      lastName: ['', { validators: [Validators.required] }],
      dateOfBirth: ['', { validators: [Validators.required] }],
      gender: ['', { validators: [Validators.required] }],
      country: [''],
      tel: ['', { validators: [Validators.required] }],
      citizenship: [''],
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

  get country() {
    return this.signupForm.controls['country'];
  }

  get tel() {
    return this.signupForm.controls['tel'];
  }

  get citizenship() {
    return this.signupForm.controls['citizenship'];
  }
}
