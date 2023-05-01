import { Component, OnInit, OnChanges, Input, Inject, SimpleChanges } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Store } from '@ngrx/store';
import moment, { Moment } from 'moment';
import { DEFAULT_DATE_FORMAT } from 'src/app/core/constants/formats.constants';
import { MaterialDateFormatInterface } from 'src/app/core/models/material-date-format.model';
import { updateOrderDateAction } from 'src/app/core/store/actions/order.actions';
import { AppStateInterface } from 'src/app/core/store/store.models';

@Component({
  selector: 'airways-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: DEFAULT_DATE_FORMAT },
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class DatePickerComponent implements OnInit, OnChanges {
  departure = new FormControl<Moment | null>(null, [Validators.required]);

  arrival = new FormControl<Moment | null>(null, [Validators.required]);

  minDate = new Date();

  @Input() departureDate!: string | null;

  @Input() arrivalDate!: string | null;

  @Input() dateFormat: string | null = DEFAULT_DATE_FORMAT.display.dateInput;

  @Input() tripType!: string;

  constructor(
    @Inject(MAT_DATE_FORMATS) private dateFormats: MaterialDateFormatInterface,
    private parentForm: FormGroupDirective,
    private store: Store<AppStateInterface>,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateFormat'] && this.dateFormat) {
      this.dateFormats.display.dateInput = this.dateFormat;
      this.dateFormats.parse.dateInput = this.dateFormat;
      this.updateDateFormsFormat();
    }
    if (changes['tripType']) {
      this.toggleValidation();
    }
    if (changes['departureDate'] && this.departureDate) {
      this.departure.setValue(moment(this.departureDate));
    }
    if (changes['arrivalDate'] && this.arrivalDate) {
      this.arrival.setValue(moment(this.arrivalDate));
    }
  }

  initializeForm() {
    this.parentForm.form.addControl('departure', this.departure);
    this.parentForm.form.addControl('arrival', this.arrival);
  }

  toggleValidation(): void {
    if (this.tripType === 'round-trip') {
      this.arrival.setValidators([Validators.required]);
    } else {
      this.arrival.removeValidators([Validators.required]);
    }
    if (this.tripType === 'one-way') {
      this.store.dispatch(
        updateOrderDateAction({
          param: 'arrival',
          data: '',
        }),
      );
    }
  }

  updateDateFormsFormat() {
    const departure = this.departure.value;
    const arrival = this.arrival.value;
    this.departure.setValue(departure);
    this.arrival.setValue(arrival);
  }

  onDepartureDateChange() {
    if (!this.departure.value) return;
    this.store.dispatch(
      updateOrderDateAction({
        param: 'departure',
        data: this.departure.value?.toISOString(),
      }),
    );
  }

  onArrivalDateChange() {
    if (!this.arrival.value) return;
    this.store.dispatch(
      updateOrderDateAction({
        param: 'arrival',
        data: this.arrival.value?.toISOString(),
      }),
    );
  }
}
