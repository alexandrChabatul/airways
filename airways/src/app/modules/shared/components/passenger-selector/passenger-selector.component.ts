import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { updateOrderPassengersAction } from 'src/app/core/store/actions/order.actions';
import { selectPassengers } from 'src/app/core/store/selectors/order.selectors';
import {
  PassengersInterface,
  PassengersOptionNamesType,
  PassengerTypeInterface,
} from 'src/app/modules/shared/models/passenger-types.models';
import { DEFAULT_PASSENGERS, PASSENGER_TYPES } from '../../constants/passenger.constants';

@Component({
  selector: 'airways-persons-selector',
  templateUrl: './passenger-selector.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class PassengerSelectorComponent implements OnInit, OnDestroy {
  selectOptions: PassengerTypeInterface[] = PASSENGER_TYPES;

  passengers: PassengersInterface = DEFAULT_PASSENGERS;

  passengerSubscription!: Subscription;

  passengersControl!: FormControl;

  constructor(private parentForm: FormGroupDirective, private store: Store) {}

  ngOnInit(): void {
    this.passengersControl = new FormControl<PassengersInterface>(this.passengers);
    this.parentForm.form.addControl('passengers', this.passengersControl);
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.passengerSubscription.unsubscribe();
  }

  initializeListeners() {
    this.passengerSubscription = this.store
      .select(selectPassengers)
      .pipe(filter(Boolean))
      .subscribe((passengers) => {
        this.passengers = passengers;
        this.passengersControl.setValue(passengers);
        this.updateButtonsAvailable();
      });
  }

  addPassenger(event: Event, optionName: PassengersOptionNamesType): void {
    event.stopPropagation();
    if (optionName === 'infant' && !this.checkInfantToAdult()) {
      return;
    }
    this.dispatchUpdatePassengers({
      ...this.passengers,
      [optionName]: this.passengers[optionName] + 1,
    });
  }

  removePassenger(event: Event, optionName: PassengersOptionNamesType): void {
    event.stopPropagation();
    if (
      !this.passengers[optionName] ||
      (optionName === 'adults' && !this.checkInfantToAdult()) ||
      (optionName === 'adults' && this.passengers.adults <= 1)
    ) {
      return;
    }
    this.dispatchUpdatePassengers({
      ...this.passengers,
      [optionName]: this.passengers[optionName] - 1,
    });
  }

  checkInfantToAdult(): boolean {
    return this.passengers.adults > this.passengers.infant;
  }

  updateButtonsAvailable() {
    this.selectOptions[0].isRemoveAvailable =
      this.passengers.adults > 1 && this.checkInfantToAdult();
    this.selectOptions[1].isRemoveAvailable = this.passengers.child > 0;
    this.selectOptions[2].isRemoveAvailable = this.passengers.infant > 0;
    this.selectOptions[2].isAddAvailable = this.checkInfantToAdult();
  }

  dispatchUpdatePassengers(passengers: PassengersInterface) {
    this.store.dispatch(
      updateOrderPassengersAction({
        param: 'passengers',
        data: passengers,
      }),
    );
  }
}
