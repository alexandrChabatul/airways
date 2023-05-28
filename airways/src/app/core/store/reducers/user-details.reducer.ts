import { createReducer, on } from '@ngrx/store';
import { UserDetailsStateInterface } from '../store.models';
import { addDetails, removeDetails } from '../actions/user-details.actions';

const initialState: UserDetailsStateInterface = {
  details: null,
};

export const userDetailsReducer = createReducer(
  initialState,
  on(
    addDetails,
    (state, action): UserDetailsStateInterface => ({
      ...state,
      details: {
        ...action.item,
      },
    }),
  ),
  on(
    removeDetails,
    (): UserDetailsStateInterface => ({
      ...initialState,
    }),
  ),
);
