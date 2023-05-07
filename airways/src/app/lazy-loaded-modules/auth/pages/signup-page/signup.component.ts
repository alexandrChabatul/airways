import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { SvgIconService } from 'src/app/core/services/svg-icon.service';
import { COUNTRY_CODES } from '../../constants/country-codes.constants';
import { Store } from '@ngrx/store';
import { signupRequestAction } from 'src/app/core/store/actions/auth.actions';
import { selectErrorMessage } from 'src/app/core/store/selectors/auth.selectors';

@Component({
  selector: 'airways-signup-page',
  templateUrl: './signup-page.component.html',
})
export class SignupPageComponent implements OnInit {
  signupForm!: FormGroup;

  errorMessage!: Observable<string | null | undefined>;

  hide = true;

  maxDate: Date = new Date();

  codes!: string[];

  countries!: string[];

  filteredCountryCodes!: Observable<string[]>;

  filteredCountries!: Observable<string[]>;

  constructor(
    private formBuilder: FormBuilder,
    private svgIconService: SvgIconService,
    private store: Store,
  ) {
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

  checkIfCountryMatches() {
    const inputValue = this.country.value;
    const isValueValid = this.codes.some(
      (countryCode) => countryCode.toLowerCase() === inputValue.toLowerCase(),
    );
    if (!isValueValid) {
      this.country.setValue('');
    }
  }

  checkIfCitizenshipMatches() {
    const inputValue = this.citizenship.value;
    const isValueValid = this.countries.some(
      (country) => country.toLowerCase() === inputValue.toLowerCase(),
    );
    if (!isValueValid) {
      this.citizenship.setValue('');
    }
  }

  onSignUp() {
    this.signupForm.markAllAsTouched();
    if (!this.signupForm.valid) {
      this.signupForm.markAsTouched();
      this.checkIfCountryMatches();
      this.checkIfCitizenshipMatches();
      return;
    }
    const credentials = {
      email: this.email.value,
      password: this.password.value,
    };
    this.store.dispatch(signupRequestAction({ credentials }));
    this.errorMessage = this.store.select(selectErrorMessage);
  }

  createSignupForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required, Validators.minLength(8)] }],
      firstName: ['', { validators: [Validators.required, this.onlyLettersValidator] }],
      lastName: ['', { validators: [Validators.required, this.onlyLettersValidator] }],
      dateOfBirth: ['', { validators: [Validators.required] }],
      gender: ['', { validators: [Validators.required] }],
      country: [''],
      tel: ['', { validators: [Validators.required, this.onlyNumbersValidator] }],
      citizenship: [''],
      terms: ['', [Validators.required]],
    });
  }

  onlyLettersValidator(control: AbstractControl): ValidationErrors | null {
    const onlyLettersRegex = /^[A-Za-z]+$/;
    const isOnlyLetters = onlyLettersRegex.test(control.value);
    return isOnlyLetters ? null : { isOnlyLetters: true };
  }

  onlyNumbersValidator(control: AbstractControl) {
    if (!control.value) {
      return null;
    }
    const onlyNumbersRegex = /^[0-9]+$/;
    const isOnlyNumbers = onlyNumbersRegex.test(control.value);
    return isOnlyNumbers ? null : { isOnlyNumbers: true };
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

  get terms() {
    return this.signupForm.controls['terms'];
  }
}
