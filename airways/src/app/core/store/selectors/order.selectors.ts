import { createSelector } from '@ngrx/store';
import { AppStateInterface, OrderStateInterface } from '../store.models';

export const orderFeatureSelector = (state: AppStateInterface): OrderStateInterface => state.order;

export const selectPassengers = createSelector(
  orderFeatureSelector,
  (orderState: OrderStateInterface) => orderState.passengers,
);
export const selectArrivalDate = createSelector(
  orderFeatureSelector,
  (orderState: OrderStateInterface) => orderState.arrival,
);
export const selectDepartureDate = createSelector(
  orderFeatureSelector,
  (orderState: OrderStateInterface) => orderState.departure,
);
