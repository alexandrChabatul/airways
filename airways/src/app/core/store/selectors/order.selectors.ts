import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderStateInterface } from '../store.models';

export const selectOrderFeature = createFeatureSelector<OrderStateInterface>('order');

export const selectPassengers = createSelector(
  selectOrderFeature,
  (orderState: OrderStateInterface) => orderState.passengers,
);
export const selectArrivalDate = createSelector(
  selectOrderFeature,
  (orderState: OrderStateInterface) => orderState.arrival,
);
export const selectDepartureDate = createSelector(
  selectOrderFeature,
  (orderState: OrderStateInterface) => orderState.departure,
);
export const selectOriginAirport = createSelector(
  selectOrderFeature,
  (orderState: OrderStateInterface) => orderState.origin,
);
export const selectDestinationAirport = createSelector(
  selectOrderFeature,
  (orderState: OrderStateInterface) => orderState.destination,
);
