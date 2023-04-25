import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutocompleteResponseInterface } from 'src/app/core/models/autocomplete-response.interface';
import { CustomDateValidator } from 'src/app/core/validators/custom-date.validator';

@Component({
  selector: 'airways-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  tripType = 'round-trip';

  from: AutocompleteResponseInterface | undefined = undefined;

  destination: AutocompleteResponseInterface | undefined = undefined;

  @Input() selected!: string;

  roundTripDateForm!: FormGroup;

  oneWayTripDateForm!: FormGroup;

  minDate = new Date();

  constructor(private fb: FormBuilder, private customDateValidator: CustomDateValidator) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms() {
    this.roundTripDateForm = this.fb.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
    });
    this.oneWayTripDateForm = this.fb.group({
      date: [
        '',
        [
          Validators.required,
          this.customDateValidator.actualDateValidation.bind(this.customDateValidator),
        ],
      ],
    });
  }

  swapFields() {
    if (this.from && this.destination) {
      const from = this.from;
      this.from = this.destination;
      this.destination = from;
    }
  }

  changeFromAirport(airport: AutocompleteResponseInterface | undefined) {
    this.from = airport;
  }

  changeDestinationAirport(airport: AutocompleteResponseInterface | undefined) {
    this.destination = airport;
  }
}
