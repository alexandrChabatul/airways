import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, startWith, switchMap, of, auditTime, distinctUntilChanged, tap } from 'rxjs';
import { AirportResponseInterface } from 'src/app/core/models/airport-response.interface';
import { AutocompleteService } from 'src/app/core/services/autocomplete.service';
import { updateOrderAirportAction } from 'src/app/core/store/actions/order.actions';
import { AppStateInterface } from 'src/app/core/store/store.models';

@Component({
  selector: 'airways-airway-autocomplete',
  templateUrl: './airway-autocomplete.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AirwayAutocompleteComponent implements OnInit, OnChanges {
  filteredOptions$!: Observable<AirportResponseInterface[]>;

  fieldControl = new FormControl<string | AirportResponseInterface>('');

  @Input() label = '';

  @Input() controlName!: string;

  @Input() placeholderText!: string;

  @Input() airport!: AirportResponseInterface | null;

  constructor(
    private autocompleteService: AutocompleteService,
    private parentForm: FormGroupDirective,
    private store: Store<AppStateInterface>,
  ) {}

  ngOnInit() {
    this.parentForm.form.addControl(this.controlName, this.fieldControl);
    this.fieldControl.addValidators([Validators.required]);
    this.filteredOptions$ = this.fieldControl.valueChanges.pipe(
      tap((val) => console.log(this.controlName, val)),
      startWith(''),
      auditTime(500),
      distinctUntilChanged(),
      switchMap((value) => {
        const query = typeof value === 'string' ? value : value?.name;
        return query ? this.autocompleteService.getOptions(query) : of([]);
      }),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, this.controlName);
    if (changes['airport']) {
      this.fieldControl.setValue(this.airport);
    }
  }

  displayFn(airport: AirportResponseInterface): string {
    return airport ? `${airport.name} ${airport.code}` : '';
  }

  onAirportSelect(airport: AirportResponseInterface) {
    this.store.dispatch(
      updateOrderAirportAction({
        param: this.controlName as 'origin' | 'destination',
        data: airport,
      }),
    );
  }
}
