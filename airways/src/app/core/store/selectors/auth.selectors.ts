import { createSelector } from '@ngrx/store';
import { AppStateInterface, AuthStateInterface } from '../store.models';

export const authFeatureSelector = (state: AppStateInterface): AuthStateInterface => state.auth;

export const selectIsLoggedIn = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn,
);
export const selectUsername = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.username,
);
