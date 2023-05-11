import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from '../action-types/auth.action-types';
import { AuthResponseData } from '../../models/auth-response.interface';

export const loginRequestAction = createAction(
  AuthActionTypes.LOGIN_REQUEST,
  props<{ credentials: { email: string; password: string } }>(),
);

export const loginSuccessAction = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ loginSuccessResponse: AuthResponseData }>(),
);

export const loginFailureAction = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ loginFailureResponse: string }>(),
);

export const signupRequestAction = createAction(
  AuthActionTypes.SIGNUP_REQUEST,
  props<{ credentials: { email: string; password: string } }>(),
);

export const signupSuccessAction = createAction(
  AuthActionTypes.SIGNUP_SUCCESS,
  props<{ signupSuccessResponse: AuthResponseData }>(),
);

export const signupFailureAction = createAction(
  AuthActionTypes.SIGNUP_FAILURE,
  props<{ signupFailureResponse: string }>(),
);
