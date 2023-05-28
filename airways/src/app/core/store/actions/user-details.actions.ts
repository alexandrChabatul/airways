import { createAction, props } from '@ngrx/store';
import { UserDetailsActionTypes } from '../action-types/user-details.action-types';
import { CartItemWithFlagInterface } from '../../models/cart.models';

export const addDetails = createAction(
  UserDetailsActionTypes.ADD_DETAILS,
  props<{ item: CartItemWithFlagInterface }>(),
);

export const removeDetails = createAction(UserDetailsActionTypes.REMOVE_DETAILS);
