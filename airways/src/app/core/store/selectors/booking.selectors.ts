import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingStateInterface } from '../store.models';
import { PassengerTypeInfoInterface } from '../../models/booking.model';

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

export const selectBookingIsRound = createSelector(
  selectBookingFeature,
  (bookingState: BookingStateInterface) => bookingState.order.isRound,
);

export const selectBookingPassengersInfo = createSelector(
  selectBookingFeature,
  (bookingState: BookingStateInterface) => bookingState.passengers,
);

export const selectBookingPassengerById = (props: { id: number }) =>
  createSelector(selectBookingFeature, (bookingState: BookingStateInterface) => {
    for (const type in bookingState.passengers) {
      const typeObject = bookingState.passengers[type as keyof BookingStateInterface['passengers']];
      if (!!typeObject && !('email' in typeObject)) {
        for (const passengerId in typeObject) {
          if (passengerId === `${props.id}`) {
            return typeObject[passengerId as keyof PassengerTypeInfoInterface];
          }
        }
      }
    }

    return null;
  });

export const selectBookingContactDetails = createSelector(
  selectBookingFeature,
  (bookingState: BookingStateInterface) => bookingState.passengers.contactDetails,
);
