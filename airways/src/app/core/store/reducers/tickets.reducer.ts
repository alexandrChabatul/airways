import { createReducer, on } from '@ngrx/store';
import { TicketsStateInterface } from '../store.models';
import {
  ticketsChangeActive,
  ticketsLoadFailureAction,
  ticketsLoadSuccessAction,
} from '../actions/tickets.actions';
import { ExtendedTicketInterface } from '../../models/ticket.models';

const initialState: TicketsStateInterface = {
  data: [],
};

export const ticketsReducer = createReducer(
  initialState,
  on(
    ticketsLoadSuccessAction,
    (state, action): TicketsStateInterface => ({
      ...state,
      data: action.data,
    }),
  ),
  on(
    ticketsLoadFailureAction,
    (state): TicketsStateInterface => ({
      ...state,
      data: [],
    }),
  ),
  on(ticketsChangeActive, (state, action): TicketsStateInterface => {
    const newData: ExtendedTicketInterface[] = state.data.map((el) => {
      let isActive = false;

      if (el.index === action.index) {
        isActive = true;
      }

      return {
        ...el,
        isActive,
      };
    });

    return {
      ...state,
      data: newData,
    };
  }),
);
