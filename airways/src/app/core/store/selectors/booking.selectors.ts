import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingStateInterface } from '../store.models';

export const selectBookingFeature = createFeatureSelector<BookingStateInterface>('booking');

export const selectBookingOrder = createSelector(
  selectBookingFeature,
  (bookingState: BookingStateInterface) => bookingState.order,
);

export const selectBookingOrderValidity = createSelector(
  selectBookingFeature,
  (bookingState: BookingStateInterface) => bookingState.order.isValid,
);

export const selectBookingOrderTicketTo = createSelector(
  selectBookingFeature,
  (bookingState: BookingStateInterface) => bookingState.order.ticket,
);

export const selectBookingOrderTicketBack = createSelector(
  selectBookingFeature,
  (bookingState: BookingStateInterface) => bookingState.order.ticketBack,
);