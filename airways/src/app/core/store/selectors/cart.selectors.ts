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
