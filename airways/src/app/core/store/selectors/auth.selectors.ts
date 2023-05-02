import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface, AuthStateInterface } from '../store.models';

export const selectAuthFeature = createFeatureSelector<AuthStateInterface>('auth');

export const authFeatureSelector = (state: AppStateInterface): AuthStateInterface => state.auth;

export const selectIsLoggedIn = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn,
);
export const selectEmail = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.email,
);
