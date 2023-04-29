import { createSelector } from '@ngrx/store';
import { PassengersInterface } from 'src/app/modules/home/models/passenger-types.models';
import { AppStateInterface, OrderStateInterface } from '../store.models';

export const orderFeatureSelector = (state: AppStateInterface): OrderStateInterface => state.order;

export const selectPassengers = createSelector(
  orderFeatureSelector,
  (orderState: OrderStateInterface): PassengersInterface => orderState.passengers,
);
