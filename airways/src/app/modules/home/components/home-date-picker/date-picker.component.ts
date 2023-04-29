import { Component, OnInit, OnChanges, Input, Inject, SimpleChanges } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DEFAULT_DATE_FORMAT } from 'src/app/core/constants/formats.constants';
import { MaterialDateFormatInterface } from 'src/app/core/models/material-date-format.model';

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
  departure = new FormControl<string>('');

  arrival = new FormControl<string>('');

  minDate = new Date();

  @Input() dateFormat: string | null = DEFAULT_DATE_FORMAT.display.dateInput;

  @Input() tripType!: string;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DATE_FORMATS) private dateFormats: MaterialDateFormatInterface,
    private parentForm: FormGroupDirective,
  ) {}

  ngOnInit(): void {
    this.parentForm.form.addControl('departure', this.departure);
    this.parentForm.form.addControl('arrival', this.arrival);
    this.departure.setValidators([Validators.required]);
    this.arrival.setValidators([Validators.required]);
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
  }

  toggleValidation(): void {
    if (this.tripType === 'round-trip') {
      this.arrival.setValidators([Validators.required]);
    } else {
      this.arrival.removeValidators([Validators.required]);
    }
    this.arrival.setValue('');
    this.departure.setValue('');
  }

  updateDateFormsFormat() {
    const departure = this.departure.value;
    const arrival = this.arrival.value;
    this.departure.setValue(departure);
    this.arrival.setValue(arrival);
  }
}
