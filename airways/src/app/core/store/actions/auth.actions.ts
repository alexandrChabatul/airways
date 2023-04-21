import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from '../action-types/auth.action-types';

export const loginAction = createAction(
  AuthActionTypes.LOGIN,
  props<{ login: string; password: string }>(),
);
export const loginSuccessAction = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ username: string }>(),
);
export const loginFailureAction = createAction(AuthActionTypes.LOGIN_FAILURE);
