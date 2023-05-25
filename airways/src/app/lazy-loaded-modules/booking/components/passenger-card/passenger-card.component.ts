import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { SvgIconService } from '../../../../core/services/svg-icon.service';
import { Observable } from 'rxjs';
import { PassengerInfoInterface } from '../../../../core/models/booking.model';
import { Store } from '@ngrx/store';
import { selectBookingPassengerById } from '../../../../core/store/selectors/booking.selectors';

@Component({
  selector: 'airways-passenger-card',
  templateUrl: './passenger-card.component.html',
  styleUrls: ['./passenger-card.component.scss'],
})
export class PassengerCardComponent implements OnInit, OnDestroy {
  @Input() passengerType = '';

  @Input() passengerIndex = 0;

  @Input() parentForm!: FormGroup;

  public passengerForm!: FormGroup;

  public maxDate: Date = new Date();

  public passengerInfo$!: Observable<PassengerInfoInterface | null>;

  constructor(
    private formBuilder: FormBuilder,
    private svgIconService: SvgIconService,
    private store: Store,
  ) {
    this.svgIconService.addSvgIcon('info');
    this.svgIconService.addSvgIcon('assistance');
  }

  ngOnInit(): void {
    this.passengerForm = this.formBuilder.group({
      firstName: ['', { validators: [Validators.required, this.onlyLettersValidator] }],
      lastName: ['', { validators: [Validators.required, this.onlyLettersValidator] }],
      dateOfBirth: ['', { validators: [Validators.required] }],
      gender: ['', { validators: [Validators.required] }],
      needAssistance: false,
      needBuggage: false,
    });

    this.parentForm.addControl(`${this.passengerIndex}`, this.passengerForm);

    this.passengerInfo$ = this.store.select(
      selectBookingPassengerById({
        id: this.passengerIndex,
      }),
    );

    this.passengerInfo$.subscribe((val) => {
      if (val) {
        this.passengerForm.controls['firstName'].setValue(val.firstName, { emitEvent: false });
        this.passengerForm.controls['lastName'].setValue(val.lastName, { emitEvent: false });
        this.passengerForm.controls['dateOfBirth'].setValue(val.dateOfBirth, { emitEvent: false });
        this.passengerForm.controls['gender'].setValue(val.gender, { emitEvent: false });
        this.passengerForm.controls['needAssistance'].setValue(val.needAssistance, {
          emitEvent: false,
        });
        this.passengerForm.controls['needBuggage'].setValue(val.needBuggage, { emitEvent: false });
      }
    });
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl(`${this.passengerIndex}`);
  }

  private onlyLettersValidator(control: AbstractControl): ValidationErrors | null {
    const onlyLettersRegex = /^[A-Za-z]+$/;
    const isOnlyLetters = onlyLettersRegex.test(control.value);
    return isOnlyLetters ? null : { isOnlyLetters: true };
  }

  get firstName() {
    return this.passengerForm.controls['firstName'];
  }

  get lastName() {
    return this.passengerForm.controls['lastName'];
  }

  get dateOfBirth() {
    return this.passengerForm.controls['dateOfBirth'];
  }

  get gender() {
    return this.passengerForm.controls['gender'];
  }
}
