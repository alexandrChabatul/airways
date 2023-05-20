import { Component, OnInit, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { SvgIconService } from '../../../../core/services/svg-icon.service';

@Component({
  selector: 'airways-passenger-card',
  templateUrl: './passenger-card.component.html',
  styleUrls: ['./passenger-card.component.scss'],
})
export class PassengerCardComponent implements OnInit {
  @Input() passengerType = '';

  @Input() passengerIndex = 0;

  public passengerForm!: FormGroup;

  public maxDate: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private svgIconService: SvgIconService,
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
      needAssistance: '',
      needBuggage: '',
    });
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
