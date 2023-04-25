import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, switchMap, of, tap } from 'rxjs';
import { AutocompleteResponseInterface } from 'src/app/core/models/autocomplete-response.interface';
import { AutocompleteService } from 'src/app/core/services/autocomplete.service';

@Component({
  selector: 'airways-airway-autocomplete',
  templateUrl: './airway-autocomplete.component.html',
})
export class AirwayAutocompleteComponent implements OnChanges, OnInit {
  fieldControl = new FormControl<string>('');

  filteredOptions$!: Observable<AutocompleteResponseInterface[]>;

  @Input() airport!: AutocompleteResponseInterface | undefined;

  @Input() label = '';

  @Output() airportSubmit = new EventEmitter<AutocompleteResponseInterface>();

  constructor(private autocompleteService: AutocompleteService) {}

  ngOnInit() {
    this.filteredOptions$ = this.fieldControl.valueChanges.pipe(
      startWith(''),
      tap(this.checkEmptyString.bind(this)),
      switchMap((value) => {
        return value ? this.autocompleteService.getOptions(value) : of([]);
      }),
    );
  }

  ngOnChanges() {
    if (this.airport) {
      this.fieldControl.setValue(`${this.airport.name} ${this.airport.code}`);
    } else {
      this.fieldControl.setValue('');
    }
  }

  checkEmptyString(value: string | null) {
    if (typeof value === 'string' && value.length === 0) {
      this.selectAirport(undefined);
    }
  }

  getAirportOptionName(airport: AutocompleteResponseInterface): string {
    return `<div [innerHTML]=${airport.city_name || airport.country_name} (${
      airport.code
    }) <p>Test</p></div>`;
  }

  selectAirport(airport: AutocompleteResponseInterface | undefined) {
    this.airportSubmit.emit(airport);
  }
}
