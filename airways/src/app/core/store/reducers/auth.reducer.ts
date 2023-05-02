import { createReducer, on } from '@ngrx/store';
import { loginFailureAction, loginSuccessAction } from '../actions/auth.actions';
import { AuthStateInterface } from '../store.models';

const initialState: AuthStateInterface = {
  token: null,
  user: null,
  loginError: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(
    loginSuccessAction,
    (state, { loginSuccessResponse }): AuthStateInterface => ({
      ...state,
      token: loginSuccessResponse.token,
      user: loginSuccessResponse.user,
      isAuthenticated: true,
    }),
  ),
  on(
    loginFailureAction,
    (state, { error }): AuthStateInterface => ({
      ...state,
      loginError: error,
      token: null,
      user: null,
      isAuthenticated: false,
    }),
  ),
);
