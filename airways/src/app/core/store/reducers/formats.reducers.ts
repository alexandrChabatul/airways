import { createReducer, on } from '@ngrx/store';
import { FormatsStateInterface } from '../store.models';
import { changeCurrencyFormat, changeDateFormat } from '../actions/formats.actions';

const initialState: FormatsStateInterface = {
  dateFormat: 'MM/dd/yyyy',
  currencyFormat: 'EUR',
};

export const formatsReducer = createReducer(
  initialState,
  on(changeDateFormat,
    (state, action): FormatsStateInterface => ({
    ...state,
    dateFormat: action.dateFormat,
    })),
  on(changeCurrencyFormat,
    (state, action): FormatsStateInterface => ({
      ...state,
      currencyFormat: action.currencyFormat,
    }))
);
