import { createAction, props } from '@ngrx/store';
import { FormatsActionTypes } from '../action-types/formats.action-types';

export const changeCurrencyFormat = createAction(
  FormatsActionTypes.CHANGE_CURRENCY_FORMAT,
  props<{ currencyFormat: string }>(),
);

export const changeDateFormat = createAction(
  FormatsActionTypes.CHANGE_DATE_FORMAT,
  props<{ dateFormat: string }>(),
);
