import { createAction, props } from '@ngrx/store';
import {
  AuthActionTypes,
  AuthLoginResponse,
  AuthSignupResponse,
} from '../action-types/auth.action-types';

export const loginRequestAction = createAction(
  AuthActionTypes.LOGIN_REQUEST,
  props<{ credentials: { email: string; password: string } }>(),
);

export const loginSuccessAction = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ loginSuccessResponse: AuthLoginResponse }>(),
);

export const loginFailureAction = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ error: string }>(),
);

export const signupRequestAction = createAction(
  AuthActionTypes.SIGNUP_REQUEST,
  props<{ credentials: { email: string; password: string } }>(),
);

export const signupSuccessAction = createAction(
  AuthActionTypes.SIGNUP_SUCCESS,
  props<{ signupSuccessResponse: AuthSignupResponse }>(),
);

export const signupFailureAction = createAction(
  AuthActionTypes.SIGNUP_FAILURE,
  props<{ error: string }>(),
);
