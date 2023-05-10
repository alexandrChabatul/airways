import { createAction, props } from '@ngrx/store';
import { CartActionTypes } from '../../models/action-types/cart.action-types';
import { CartItemInterface } from '../../models/cart.models';

export const addToCartAction = createAction(
  CartActionTypes.ADD_TO_CART,
  props<{ item: CartItemInterface }>(),
);

export const addToCartSuccessAction = createAction(
  CartActionTypes.ADD_TO_CART_SUCCESS,
  props<{ items: CartItemInterface[] }>(),
);
export const addToCartFailureAction = createAction(CartActionTypes.ADD_TO_CART_FAILURE);

export const removeFromCartAction = createAction(
  CartActionTypes.REMOVE_FROM_CART,
  props<{ items: CartItemInterface[] }>(),
);

export const removeFromCartSuccessAction = createAction(
  CartActionTypes.REMOVE_FROM_CART_SUCCESS,
  props<{ items: CartItemInterface[] }>(),
);

export const removeFromCartFailureAction = createAction(CartActionTypes.REMOVE_FROM_CART_FAILURE);

export const updateCartAction = createAction(CartActionTypes.UPDATE_CART);

export const updateCartSuccessAction = createAction(
  CartActionTypes.UPDATE_CART_SUCCESS,
  props<{ items: CartItemInterface[] }>(),
);

export const updateCartFailureAction = createAction(CartActionTypes.UPDATE_CART_FAILURE);
