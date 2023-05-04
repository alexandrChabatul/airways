import { createReducer, on } from '@ngrx/store';
import {
  loginFailureAction,
  loginSuccessAction,
  signupSuccessAction,
} from '../actions/auth.actions';
import { AuthStateInterface } from '../store.models';

const initialState: AuthStateInterface = {
  accessToken: null,
  user: null,
  errorMessage: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(
    loginSuccessAction,
    (state, { loginSuccessResponse }): AuthStateInterface => ({
      ...state,
      accessToken: loginSuccessResponse.accessToken,
      user: loginSuccessResponse.user,
      isAuthenticated: true,
    }),
  ),
  on(
    signupSuccessAction,
    (state, { signupSuccessResponse }): AuthStateInterface => ({
      ...state,
      accessToken: signupSuccessResponse.accessToken,
      user: signupSuccessResponse.user,
      isAuthenticated: true,
    }),
  ),
  on(
    loginFailureAction,
    (state, { loginFailureResponse }): AuthStateInterface => ({
      ...state,
      accessToken: null,
      user: null,
      errorMessage: loginFailureResponse,
      isAuthenticated: false,
    }),
  ),
);
