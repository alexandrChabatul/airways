import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map, startWith } from 'rxjs';
import { COUNTRY_CODES } from '../../../auth/constants/country-codes.constants';

@Component({
  selector: 'airways-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  public filteredCountryCodes!: Observable<string[]>;

  public contactForm!: FormGroup;

  private codes = COUNTRY_CODES.map(
    (country) => (country.name = country.name + ' (' + country.dial_code + ')'),
  );

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      country: [''],
      tel: ['', { validators: [Validators.required, this.onlyNumbersValidator] }],
    });

    this.filteredCountryCodes = this.country.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCodes(value || '')),
    );
  }

  private filterCodes(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.codes
      .filter((country) => country.toLowerCase().includes(filterValue))
      .map((country) => country);
  }

  private onlyNumbersValidator(control: AbstractControl) {
    if (!control.value) {
      return null;
    }
    const onlyNumbersRegex = /^[0-9]+$/;
    const isOnlyNumbers = onlyNumbersRegex.test(control.value);
    return isOnlyNumbers ? null : { isOnlyNumbers: true };
  }

  get country() {
    return this.contactForm.controls['country'];
  }

  get tel() {
    return this.contactForm.controls['tel'];
  }

  get email() {
    return this.contactForm.controls['email'];
  }
}
