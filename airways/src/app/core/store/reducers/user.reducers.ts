import { Action, createReducer, on } from '@ngrx/store';
import { addToHistorySuccessAction, updateHistorySuccessAction } from '../actions/user.actions';
import { HistoryStateInterface } from '../store.models';

const initialState: HistoryStateInterface = {
  items: null,
};

const cartReducerFunction = createReducer(
  initialState,
  on(
    addToHistorySuccessAction,
    (state, action): HistoryStateInterface => ({
      ...state,
      items: action.items,
    }),
  ),
  on(
    updateHistorySuccessAction,
    (state, action): HistoryStateInterface => ({
      ...state,
      items: action.items,
    }),
  ),
);

export function userReducer(state: HistoryStateInterface, action: Action) {
  return cartReducerFunction(state, action);
}
