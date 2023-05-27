import { createReducer, on } from '@ngrx/store';
import { FormatsStateInterface } from '../store.models';
import {
  changeCurrencyFormat,
  changeDateFormat,
  changeExchangeRate,
} from '../actions/formats.actions';

const initialState: FormatsStateInterface = {
  dateFormat: 'MM/dd/yyyy',
  currencyFormat: 'EUR',
  exchangeRates: 1,
};

export const formatsReducer = createReducer(
  initialState,
  on(
    changeDateFormat,
    (state, action): FormatsStateInterface => ({
      ...state,
      dateFormat: action.dateFormat,
    }),
  ),
  on(
    changeCurrencyFormat,
    (state, action): FormatsStateInterface => ({
      ...state,
      currencyFormat: action.currencyFormat,
    }),
  ),
  on(
    changeExchangeRate,
    (state, action): FormatsStateInterface => ({
      ...state,
      exchangeRates: action.exchangeRate,
    }),
  ),
);
