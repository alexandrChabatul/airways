import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartStateInterface } from '../store.models';

export const selectCartFeature = createFeatureSelector<CartStateInterface>('cart');

export const selectCartItems = createSelector(
  selectCartFeature,
  (cartState: CartStateInterface) => cartState.items,
);

export const selectCartCount = createSelector(
  selectCartFeature,
  (cartState: CartStateInterface) => cartState.items?.length || 0,
);

export const selectTotalCartPrice = createSelector(
  selectCartFeature,
  (cartState: CartStateInterface) => {
    if (!cartState.items) return 0;
    return cartState.items?.reduce((acc, item) => {
      if (item.isActive) return acc + item.totalPrice;
      return acc;
    }, 0);
  },
);

export const selectActiveCount = createSelector(
  selectCartFeature,
  (cartState: CartStateInterface) => {
    if (!cartState.items) return 0;
    return cartState.items?.reduce((acc, item) => {
      if (item.isActive) return acc + 1;
      return acc;
    }, 0);
  },
);
export const selectIsAllItemsActive = createSelector(
  selectCartFeature,
  (cartState: CartStateInterface) => {
    if (!cartState.items) return true;
    return !cartState.items?.some((item) => !item.isActive);
  },
);
