import { createAction, props } from '@ngrx/store';
import { FormatsActionTypes } from '../action-types/formats.action-types';
import { CurrencyFormatType, DateFormatType } from '../../models/formats.models';

export const changeCurrencyFormat = createAction(
  FormatsActionTypes.CHANGE_CURRENCY_FORMAT,
  props<{ currencyFormat: CurrencyFormatType }>(),
);

export const changeDateFormat = createAction(
  FormatsActionTypes.CHANGE_DATE_FORMAT,
  props<{ dateFormat: DateFormatType }>(),
);
