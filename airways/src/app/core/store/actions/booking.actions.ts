import { createAction, props } from '@ngrx/store';
import { BookingActionTypes } from '../action-types/booking.action-types';
import { BookingTicketsUpdateInterface } from '../../models/booking.model';

export const updateTicket = createAction(
  BookingActionTypes.UPDATE_TICKET,
  props<{ ticketInfo: BookingTicketsUpdateInterface; isBack: boolean }>(),
);

export const deleteTicket = createAction(
  BookingActionTypes.DELETE_TICKET,
  props<{ isBack: boolean }>(),
);
