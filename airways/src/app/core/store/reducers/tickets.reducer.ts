import { createReducer, on } from '@ngrx/store';
import { TicketsStateInterface } from '../store.models';
import {
  ticketsChangeActive,
  ticketsLoadAction,
  ticketsLoadFailureAction,
  ticketsLoadSuccessAction,
} from '../actions/tickets.actions';
import { ExtendedTicketInterface } from '../../models/ticket.models';

const initialState: TicketsStateInterface = {
  data: [],
  dataBack: [],
  isLoading: false,
};

export const ticketsReducer = createReducer(
  initialState,
  on(
    ticketsLoadAction,
    (state): TicketsStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    ticketsLoadSuccessAction,
    (state, action): TicketsStateInterface => ({
      ...state,
      data: action.data,
      dataBack: action.dataBack,
      isLoading: false,
    }),
  ),
  on(
    ticketsLoadFailureAction,
    (state): TicketsStateInterface => ({
      ...state,
      data: [],
      dataBack: [],
      isLoading: false,
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
