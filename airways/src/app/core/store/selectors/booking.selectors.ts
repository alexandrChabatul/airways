import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingStateInterface } from '../store.models';
import { PassengerArrayInterface, PassengerTypeInfoInterface } from '../../models/booking.model';

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

export const selectBookingPassengerArray = createSelector(
  selectBookingFeature,
  (bookingState: BookingStateInterface) => {
    const passengers: PassengerArrayInterface[] = [];
    if (bookingState.passengers.adult) {
      for (const id in bookingState.passengers.adult) {
        passengers.push({ ...bookingState.passengers.adult[id], type: 'adult' });
      }
    }

    if (bookingState.passengers.child) {
      for (const id in bookingState.passengers.child) {
        passengers.push({ ...bookingState.passengers.child[id], type: 'child' });
      }
    }

    if (bookingState.passengers.infant) {
      for (const id in bookingState.passengers.infant) {
        passengers.push({ ...bookingState.passengers.infant[id], type: 'infant' });
      }
    }

    return passengers;
  },
);

export const selectBookingTicketsPrice = createSelector(
  selectBookingFeature,
  (bookingState: BookingStateInterface) => {
    let price = 0;
    if (bookingState.order.ticket) {
      price += bookingState.order.ticket.price;
    }

    if (bookingState.order.ticketBack) {
      price += bookingState.order.ticketBack.price;
    }

    return price;
  },
);

export const selectBookingEditIndex = createSelector(
  selectBookingFeature,
  (bookingState: BookingStateInterface) => bookingState.editItemIndex,
);

export const selectBookingOrderLink = createSelector(
  selectBookingFeature,
  (bookingState: BookingStateInterface) => bookingState.order.queryParams,
);
