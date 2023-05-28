import { createAction, props } from '@ngrx/store';
import {
  CartItemWithFlagAndIndexInterface,
  CartItemWithFlagInterface,
} from '../../models/cart.models';
import { UserActionTypes } from '../action-types/user.action-types';

export const addToHistoryAction = createAction(
  UserActionTypes.ADD_TO_HISTORY,
  props<{ item: CartItemWithFlagAndIndexInterface }>(),
);

export const addToHistorySuccessAction = createAction(
  UserActionTypes.ADD_TO_HISTORY_SUCCESS,
  props<{ items: CartItemWithFlagInterface[] }>(),
);
export const addToHistoryFailureAction = createAction(UserActionTypes.ADD_TO_HISTORY_FAILURE);

export const updateHistoryAction = createAction(UserActionTypes.UPDATE_HISTORY);

export const updateHistorySuccessAction = createAction(
  UserActionTypes.UPDATE_HISTORY_SUCCESS,
  props<{ items: CartItemWithFlagInterface[] }>(),
);

export const updateHistoryFailureAction = createAction(UserActionTypes.UPDATE_HISTORY_FAILURE);
