import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormatsStateInterface } from '../store.models';

export const selectFormatsFeature = createFeatureSelector<FormatsStateInterface>('formats');

export const selectDateFormat = createSelector(
  selectFormatsFeature,
  (formatsState: FormatsStateInterface) => formatsState.dateFormat,
);

export const selectCurrencyFormat = createSelector(
  selectFormatsFeature,
  (formatsState: FormatsStateInterface) => formatsState.currencyFormat,
);
