import { Action, createReducer, on } from '@ngrx/store';
import {
  addToCartSuccessAction,
  removeFromCartSuccessAction,
  toggleCartItemsActiveAction,
  updateCartItemByIndexAction,
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
  on(updateCartItemByIndexAction, (state, action): CartStateInterface => {
    const items = [...(state.items || [])];
    if (items && items[action.index]) {
      items[action.index] = action.item;
    }
    return {
      ...state,
      items,
    };
  }),
  on(toggleCartItemsActiveAction, (state, action): CartStateInterface => {
    const items = [...(state.items || [])];
    const newItems = items.map((item) => ({
      ...item,
      isActive: action.isActive,
    }));
    return {
      ...state,
      items: newItems,
    };
  }),
);

export function cartReducer(state: CartStateInterface, action: Action) {
  return cartReducerFunction(state, action);
}
