export enum CartActionTypes {
  ADD_TO_CART = '[Cart] Add to cart',
  ADD_TO_CART_SUCCESS = '[Cart] Add to cart success',
  ADD_TO_CART_FAILURE = '[Cart] Add to cart failure',

  REMOVE_FROM_CART = '[Cart] Remove from cart',
  REMOVE_FROM_CART_SUCCESS = '[Cart] Remove from cart success',
  REMOVE_FROM_CART_FAILURE = '[Cart] Remove from cart failure',

  UPDATE_CART = '[Cart] Update cart',
  UPDATE_CART_SUCCESS = '[Cart] Update cart success',
  UPDATE_CART_FAILURE = '[Cart] Update cart failure',

  UPDATE_CART_ITEM_BY_INDEX = '[Cart] Update cart item by index',

  TOGGLE_ALL_CART_ITEMS_ACTIVE = '[Cart] Toggle cart items active',
}
