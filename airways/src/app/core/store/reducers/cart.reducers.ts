import { Action, createReducer, on } from '@ngrx/store';
import {
  addToCartSuccessAction,
  removeFromCartSuccessAction,
  updateCartSuccessAction,
} from '../actions/cart.actions';
import { CartStateInterface } from '../store.models';

const initialState: CartStateInterface = {
  items: null,
};

const cartReducerFunction = createReducer(
  initialState,
  on(
    addToCartSuccessAction,
    (state, action): CartStateInterface => ({
      ...state,
      items: action.items,
    }),
  ),
  on(
    removeFromCartSuccessAction,
    (state, action): CartStateInterface => ({
      ...state,
      items: action.items,
    }),
  ),
  on(
    updateCartSuccessAction,
    (state, action): CartStateInterface => ({
      ...state,
      items: action.items,
    }),
  ),
);

export function cartReducer(state: CartStateInterface, action: Action) {
  return cartReducerFunction(state, action);
}
