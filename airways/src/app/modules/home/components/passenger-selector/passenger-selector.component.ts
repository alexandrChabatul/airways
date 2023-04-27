import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';
import {
  PassengersInterface,
  PassengerTypeInterface,
} from 'src/app/modules/home/models/passenger-types.models';
import { PASSENGER_TYPES } from '../../constants/passenger-types.constants';

@Component({
  selector: 'airways-persons-selector',
  templateUrl: './passenger-selector.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class PassengerSelectorComponent implements OnInit {
  selectOptions: PassengerTypeInterface[] = PASSENGER_TYPES;

  passengers: PassengersInterface = {
    adults: 1,
    child: 0,
    infant: 0,
  };

  selectedValue = '';

  passengersControl = new FormControl<PassengersInterface>(this.passengers);

  constructor(private parentForm: FormGroupDirective) {
    this.updateSelectedValue();
  }

  ngOnInit(): void {
    this.parentForm.form.addControl('passengers', this.passengersControl);
  }

  addPassenger(event: Event, passenger: PassengerTypeInterface): void {
    event.stopPropagation();
    if (passenger.optionName === 'infant' && !this.checkInfantToAdult()) {
      return;
    }
    passenger.count += 1;
    this.updateSelectedValue();
    this.updateButtonsAvailable();
  }

  removePassenger(event: Event, passenger: PassengerTypeInterface): void {
    event.stopPropagation();
    if (
      !passenger.count ||
      (passenger.optionName === 'adults' && !this.checkInfantToAdult()) ||
      (passenger.optionName === 'adults' && this.selectOptions[0].count <= 1)
    ) {
      return;
    }
    passenger.count -= 1;
    this.updateSelectedValue();
    this.updateButtonsAvailable();
  }

  checkInfantToAdult(): boolean {
    return this.selectOptions[0].count > this.selectOptions[2].count;
  }

  updateButtonsAvailable() {
    this.selectOptions[0].isRemoveAvailable =
      this.selectOptions[0].count > 1 && this.checkInfantToAdult();
    this.selectOptions[2].isAddAvailable = this.checkInfantToAdult();
    console.log(this.selectOptions);
  }

  updateSelectedValue(): void {
    this.passengersControl.setValue({
      adults: this.selectOptions[0].count,
      child: this.selectOptions[1].count,
      infant: this.selectOptions[2].count,
    });
    this.selectedValue = `${this.selectOptions[0].count} Adults, ${this.selectOptions[1].count} Child, ${this.selectOptions[2].count} Infant`;
  }
}
