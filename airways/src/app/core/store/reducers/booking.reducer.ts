import { createReducer, on } from '@ngrx/store';
import { BookingStateInterface } from '../store.models';
import {
  deleteTicket,
  removeBooking,
  updatePassengersInfo,
  updateTicket,
} from '../actions/booking.actions';

const initialState: BookingStateInterface = {
  order: {
    isRound: true,
    originName: '',
    destinationName: '',
    ticket: null,
    queryParams: '',
    isValid: false,
  },
  passengers: {
    adult: null,
    child: null,
    infant: null,
    contactDetails: {
      country: '',
      tel: '',
      email: '',
    },
  },
};

export const bookingReducer = createReducer(
  initialState,
  on(updateTicket, (state, { ticketInfo, isBack }): BookingStateInterface => {
    let newOrderState = { ...state.order };

    if (state.order.queryParams !== ticketInfo.queryParams) {
      //если добавили с другой квери то обнуляем прошлые билеты и перезаписываем инфу
      newOrderState = {
        ...newOrderState,
        isRound: ticketInfo.isRound,
        originName: ticketInfo.originName,
        destinationName: ticketInfo.destinationName,
        queryParams: ticketInfo.queryParams,
        ticket: null,
        ticketBack: null,
      };
    }

    newOrderState = isBack
      ? { ...newOrderState, ticketBack: ticketInfo.ticket }
      : { ...newOrderState, ticket: ticketInfo.ticket }; // в зависимости от того который билет добавляют обновляем поле

    const isValid = newOrderState.isRound
      ? !!newOrderState.ticket && !!newOrderState.ticketBack
      : !!newOrderState.ticket; // если поездка круговая то должны быть оба билета, в один конец - то один, чтобы перейти на след страницу

    return {
      ...state,
      order: {
        ...newOrderState,
        isValid,
      },
    };
  }),
  on(deleteTicket, (state, { isBack }): BookingStateInterface => {
    if (isBack) {
      return {
        ...state,
        order: {
          ...state.order,
          ticketBack: null,
          isValid: false,
        },
      };
    }

    return {
      ...state,
      order: {
        ...state.order,
        ticket: null,
        isValid: false,
      },
    };
  }),
  on(updatePassengersInfo, (state, { info }): BookingStateInterface => {
    return {
      ...state,
      passengers: { ...info },
    };
  }),
  on(removeBooking, (): BookingStateInterface => {
    return {
      ...initialState,
    };
  }),
);
