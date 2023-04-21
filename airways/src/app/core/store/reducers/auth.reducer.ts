import { Action, createReducer, on } from '@ngrx/store';
import { loginFailureAction, loginSuccessAction } from '../actions/auth.actions';
import { AuthStateInterface } from '../store.models';

const initialState: AuthStateInterface = {
  isLoggedIn: false,
  username: null,
};

const authReducer = createReducer(
  initialState,
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      username: action.username,
      isLoggedIn: true,
    }),
  ),
  on(
    loginFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      username: null,
      isLoggedIn: false,
    }),
  ),
);

export function reducer(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
