import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormatsStateInterface } from '../store.models';

export const formatsFeatureSelector = createFeatureSelector<FormatsStateInterface>('formats');

export const selectDateFormat = createSelector(
  formatsFeatureSelector,
  (formatsState: FormatsStateInterface) => formatsState.dateFormat,
);

export const selectCurrencyFormat = createSelector(
  formatsFeatureSelector,
  (formatsState: FormatsStateInterface) => formatsState.currencyFormat,
);