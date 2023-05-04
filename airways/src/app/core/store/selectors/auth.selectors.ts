import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateInterface } from '../store.models';

export const selectAuthFeature = createFeatureSelector<AuthStateInterface>('auth');

export const selectErrorMessage = createSelector(
  selectAuthFeature,
  (authState: AuthStateInterface) => authState.errorMessage,
);
