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
  dataBack: [],
};

export const ticketsReducer = createReducer(
  initialState,
  on(
    ticketsLoadSuccessAction,
    (state, action): TicketsStateInterface => ({
      ...state,
      data: action.data,
      dataBack: action.dataBack,
    }),
  ),
  on(
    ticketsLoadFailureAction,
    (state): TicketsStateInterface => ({
      ...state,
      data: [],
      dataBack: [],
    }),
  ),
  on(ticketsChangeActive, (state, action): TicketsStateInterface => {
    const arrayToMap = action.isBack ? state.dataBack : state.data;
    const newData: ExtendedTicketInterface[] = arrayToMap.map((el) => {
      let isActive = false;

      if (el.index === action.index) {
        isActive = true;
      }

      return {
        ...el,
        isActive,
      };
    });

    return action.isBack
      ? {
          ...state,
          dataBack: newData,
        }
      : {
          ...state,
          data: newData,
        };
  }),
);
