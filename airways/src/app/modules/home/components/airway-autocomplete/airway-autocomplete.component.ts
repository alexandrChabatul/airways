import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { Observable, startWith, switchMap, of } from 'rxjs';
import { AirportResponseInterface } from 'src/app/core/models/airport-response.interface';
import { AutocompleteService } from 'src/app/core/services/autocomplete.service';

@Component({
  selector: 'airways-airway-autocomplete',
  templateUrl: './airway-autocomplete.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class AirwayAutocompleteComponent implements OnInit {
  filteredOptions$!: Observable<AirportResponseInterface[]>;

  fieldControl = new FormControl<string | AirportResponseInterface>('');

  @Input() label = '';

  @Input() controlName!: string;

  @Input() placeholderText!: string;

  constructor(
    private autocompleteService: AutocompleteService,
    private parentForm: FormGroupDirective,
  ) {}

  ngOnInit() {
    this.parentForm.form.addControl(this.controlName, this.fieldControl);
    this.fieldControl.addValidators([Validators.required]);
    this.filteredOptions$ = this.fieldControl.valueChanges.pipe(
      startWith(''),
      switchMap((value) => {
        const query = typeof value === 'string' ? value : value?.name;
        return query ? this.autocompleteService.getOptions(query) : of([]);
      }),
    );
  }

  displayFn(airport: AirportResponseInterface): string {
    return airport ? `${airport.name} ${airport.code}` : '';
  }
}
