import { createAction, props } from '@ngrx/store';
import { BookingActionTypes } from '../action-types/booking.action-types';
import { BookingTicketsUpdateInterface } from '../../models/booking.model';
import { BookingStateInterface } from '../store.models';

export const updateTicket = createAction(
  BookingActionTypes.UPDATE_TICKET,
  props<{ ticketInfo: BookingTicketsUpdateInterface; isBack: boolean }>(),
);

export const deleteTicket = createAction(
  BookingActionTypes.DELETE_TICKET,
  props<{ isBack: boolean }>(),
);

export const updatePassengersInfo = createAction(
  BookingActionTypes.UPDATE_PASSENGERS,
  props<{ info: BookingStateInterface['passengers'] }>(),
);

export const removeBooking = createAction(BookingActionTypes.REMOVE_BOOKING);
